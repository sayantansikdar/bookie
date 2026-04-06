# Bookie

An end-to-end MLOps pipeline for Bookie (a Book Recommendation System).

## Architecture
- **Data Versioning**: DVC (local storage remote configured).
- **Orchestration**: Apache Airflow.
- **Model Training Tracking**: MLflow.
- **API Serving**: FastAPI.
- **Frontend**: React.
- **Monitoring**: Prometheus & Grafana.

## Getting Started (Runbook)

### 1. Prerequisites
Ensure you have Docker and Docker Compose installed and running on your machine.
Ensure you have allocated at least 6GB RAM to Docker.

### 2. DVC Setup (Already Configured)
DVC is initialized and a local remote `myremote` is set to `/tmp/dvc-storage`.
If you want to use a different remote (e.g., S3):
```bash
dvc remote add -d s3remote s3://my-dvc-bucket/book-reco
```

### 3. Start the Services
Run the entire platform with one command:
```bash
docker compose up --build -d
```

### 4. Exploring the Services
Once running, you can access the following services:
- **React Frontend**: [http://localhost:3000](http://localhost:3000)
- **FastAPI Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Airflow UI**: [http://localhost:8080](http://localhost:8080) (user: `admin`, pass: `admin`)
- **MLflow Tracking**: [http://localhost:5001](http://localhost:5001)
- **Grafana Dashboards**: [http://localhost:3001](http://localhost:3001) (Import the provided `grafana-dashboard.json`)
- **Prometheus Targets**: [http://localhost:9090](http://localhost:9090)

### 5. Running the Pipeline
The Airflow DAG `mlops_pipeline` triggers automatically. It will:
1. Ingest dummy data to `data/raw/`
2. Preprocess data to `data/processed/`
3. Train the Collaborative Filtering Model (SVD) and log to MLflow.
4. Evaluate and log metrics to MLflow.

Once the pipeline completes, FastAPI can be queried to serve predictions!
