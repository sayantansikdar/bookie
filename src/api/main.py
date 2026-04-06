from fastapi import FastAPI, HTTPException
import mlflow.pyfunc
from pydantic import BaseModel
from typing import List
import os
import pandas as pd
from prometheus_client import make_asgi_app, Counter, Histogram
import time
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Bookie API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

REQUEST_COUNT = Counter("api_request_count", "Total number of API requests", ["method", "endpoint", "http_status"])
REQUEST_LATENCY = Histogram("api_request_latency_seconds", "Request latency in seconds", ["endpoint"])

MLFLOW_TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000")
MODEL_NAME = "BookRecoModel"

model = None

@app.on_event("startup")
def load_model():
    global model
    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    try:
        model = mlflow.pyfunc.load_model(f"models:/{MODEL_NAME}/latest")
        print(f"Loaded model {MODEL_NAME} from registry")
    except Exception as e:
        print(f"Could not load from registry: {e}. Will attempt later or fallback.")

class RecommendationResponse(BaseModel):
    user_id: int
    recommendations: List[dict]

@app.get("/health")
def health_check():
    REQUEST_COUNT.labels(method="GET", endpoint="/health", http_status=200).inc()
    return {"status": "ok", "model_loaded": model is not None}

@app.post("/recommend/{user_id}", response_model=RecommendationResponse)
def recommend(user_id: int, top_n: int = 5):
    start_time = time.time()
    
    global model
    if model is None:
        # Try loading again (in case model was trained after startup)
        try:
            model = mlflow.pyfunc.load_model(f"models:/{MODEL_NAME}/latest")
        except:
            pass
            
    if model is None:
        REQUEST_COUNT.labels(method="POST", endpoint="/recommend", http_status=503).inc()
        raise HTTPException(status_code=503, detail="Model is not loaded yet")
    
    try:
        candidate_books = list(range(1, 501))
        df = pd.DataFrame({"user_id": [user_id]*len(candidate_books), "book_id": candidate_books})
        
        predictions = model.predict(df)
            
        df["predicted_rating"] = predictions
        top_recos = df.sort_values("predicted_rating", ascending=False).head(top_n)
        recos = [{"book_id": int(row["book_id"]), "predicted_rating": float(row["predicted_rating"])} for _, row in top_recos.iterrows()]
        
        REQUEST_COUNT.labels(method="POST", endpoint="/recommend", http_status=200).inc()
        REQUEST_LATENCY.labels(endpoint="/recommend").observe(time.time() - start_time)
        return {"user_id": user_id, "recommendations": recos}
        
    except Exception as e:
        REQUEST_COUNT.labels(method="POST", endpoint="/recommend", http_status=500).inc()
        raise HTTPException(status_code=500, detail=str(e))
