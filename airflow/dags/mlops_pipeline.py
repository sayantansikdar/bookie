import os
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    'mlops_pipeline',
    default_args=default_args,
    description='Book Recommendation MLOps Pipeline',
    schedule_interval=timedelta(days=1),
    start_date=datetime(2023, 1, 1),
    catchup=False,
    tags=['mlops'],
) as dag:

    # Quick dependency installation (in production, use a custom image)
    install_deps = BashOperator(
        task_id='install_deps',
        bash_command='pip install pandas scikit-learn scikit-surprise mlflow psycopg2-binary joblib'
    )

    ingest_data = BashOperator(
        task_id='ingest_data',
        bash_command='python src/data_pipeline/ingest.py',
        cwd='/opt/airflow'
    )

    preprocess_data = BashOperator(
        task_id='preprocess_data',
        bash_command='python src/data_pipeline/preprocess.py',
        cwd='/opt/airflow'
    )

    train_model = BashOperator(
        task_id='train_model',
        bash_command='MLFLOW_TRACKING_URI=http://mlflow:5000 python src/train_model.py',
        cwd='/opt/airflow'
    )

    evaluate_model = BashOperator(
        task_id='evaluate_model',
        bash_command='MLFLOW_TRACKING_URI=http://mlflow:5000 python src/evaluate.py',
        cwd='/opt/airflow'
    )

    install_deps >> ingest_data >> preprocess_data >> train_model >> evaluate_model
