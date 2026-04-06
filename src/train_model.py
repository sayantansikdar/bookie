import pandas as pd
from surprise import Dataset, Reader, SVD
import mlflow
import mlflow.pyfunc
import joblib
import os

class SurpriseModelWrapper(mlflow.pyfunc.PythonModel):
    def load_context(self, context):
        self.model = joblib.load(context.artifacts["model"])
        
    def predict(self, context, model_input):
        predictions = []
        for _, row in model_input.iterrows():
            pred = self.model.predict(row["user_id"], row["book_id"])
            predictions.append(pred.est)
        return predictions

def train(train_path="data/processed/train.csv", model_path="data/models/svd_model.pkl"):
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    
    mlflow.set_tracking_uri(os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000"))
    mlflow.set_experiment("book-reco-experiment")
    
    df = pd.read_csv(train_path)
    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(df[['user_id', 'book_id', 'rating']], reader)
    trainset = data.build_full_trainset()
    
    # Check if a run is already active
    active_run = mlflow.active_run()
    if active_run:
        mlflow.end_run()
        
    with mlflow.start_run() as run:
        n_factors = 50
        n_epochs = 20
        lr_all = 0.005
        reg_all = 0.02
        
        mlflow.log_params({
            "n_factors": n_factors,
            "n_epochs": n_epochs,
            "lr_all": lr_all,
            "reg_all": reg_all
        })
        
        algo = SVD(n_factors=n_factors, n_epochs=n_epochs, lr_all=lr_all, reg_all=reg_all, random_state=42)
        algo.fit(trainset)
        
        joblib.dump(algo, model_path)
        
        try:
            mlflow.pyfunc.log_model(
                artifact_path="model",
                python_model=SurpriseModelWrapper(),
                artifacts={"model": model_path},
                registered_model_name="BookRecoModel"
            )
            print("Model logged and registered to MLflow")
        except Exception as e:
            print(f"Error logging to MLflow model registry: {e}")
            print("To use the registry, ensure the backend store is a DB. If not, don't use registered_model_name.")
            mlflow.pyfunc.log_model(
                artifact_path="model",
                python_model=SurpriseModelWrapper(),
                artifacts={"model": model_path}
            )

if __name__ == "__main__":
    train()
