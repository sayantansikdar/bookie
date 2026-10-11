"""Train the Bookie SVD model and export its recommendations as static JSON.

GitHub Pages can't host the FastAPI + MLflow model server, so the Pages
workflow runs the same pipeline here (ingest -> preprocess -> train SVD with
the hyperparameters from src/train_model.py -> evaluate) and writes every
user's top-N predictions to frontend/public/recommendations.json. The React
app reads that file when built with REACT_APP_STATIC=1.
"""
import json
import os
import sys
from datetime import datetime, timezone

import pandas as pd
from surprise import SVD, Dataset, Reader, accuracy

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src", "data_pipeline"))
from ingest import ingest_data  # noqa: E402
from preprocess import preprocess  # noqa: E402

# Same hyperparameters as src/train_model.py
PARAMS = {"n_factors": 50, "n_epochs": 20, "lr_all": 0.005, "reg_all": 0.02}
CANDIDATE_BOOKS = range(1, 501)  # same candidate set as src/api/main.py
TOP_N = 5


def main(out_path: str = "frontend/public/recommendations.json") -> None:
    ingest_data()
    preprocess()
    train_df = pd.read_csv("data/processed/train.csv")
    test_df = pd.read_csv("data/processed/test.csv")

    reader = Reader(rating_scale=(1, 5))
    trainset = Dataset.load_from_df(train_df[["user_id", "book_id", "rating"]], reader).build_full_trainset()
    algo = SVD(random_state=42, **PARAMS)
    algo.fit(trainset)

    preds = [algo.predict(r.user_id, r.book_id, r_ui=r.rating) for r in test_df.itertuples()]
    rmse = accuracy.rmse(preds, verbose=False)
    mae = accuracy.mae(preds, verbose=False)

    def top_for(user_id):
        scored = [(b, algo.predict(user_id, b).est) for b in CANDIDATE_BOOKS]
        scored.sort(key=lambda x: (-round(x[1], 4), x[0]))
        return [[b, round(est, 4)] for b, est in scored[:TOP_N]]

    users = sorted(int(u) for u in pd.concat([train_df.user_id, test_df.user_id]).unique())
    payload = {
        "meta": {
            "model": "SVD (scikit-surprise)",
            "params": PARAMS,
            "rmse": round(rmse, 4),
            "mae": round(mae, 4),
            "n_ratings": int(len(train_df) + len(test_df)),
            "n_train": int(len(train_df)),
            "n_test": int(len(test_df)),
            "n_users": len(users),
            "n_books": len(CANDIDATE_BOOKS),
            "top_n": TOP_N,
            "trained_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        },
        # Unknown users get the model's cold-start prediction (global mean + item bias)
        "fallback": top_for(-1),
        "users": {str(u): top_for(u) for u in users},
    }
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(payload, f, separators=(",", ":"))
    print(f"RMSE={rmse:.4f} MAE={mae:.4f} users={len(users)} -> {out_path} ({os.path.getsize(out_path) / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
