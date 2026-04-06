import pandas as pd
from surprise import accuracy
import joblib
import mlflow
import os

def evaluate(test_path="data/processed/test.csv", model_path="data/models/svd_model.pkl"):
    mlflow.set_tracking_uri(os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000"))
    mlflow.set_experiment("book-reco-experiment")
    
    df = pd.read_csv(test_path)
    algo = joblib.load(model_path)
    
    predictions = []
    for _, row in df.iterrows():
        pred = algo.predict(row["user_id"], row["book_id"], r_ui=row["rating"])
        predictions.append(pred)
        
    rmse = accuracy.rmse(predictions, verbose=False)
    mae = accuracy.mae(predictions, verbose=False)
    
    active_run = mlflow.active_run()
    if not active_run:
        # Instead of nested=True, just start a new run or reuse active
        run = mlflow.start_run(run_name="evaluate")
    
    try:
        mlflow.log_metrics({
            "rmse": rmse,
            "mae": mae
        })
    finally:
        if not active_run:
            mlflow.end_run()
        
    print(f"Evaluation finished: RMSE={rmse:.4f}, MAE={mae:.4f}")

if __name__ == "__main__":
    evaluate()
