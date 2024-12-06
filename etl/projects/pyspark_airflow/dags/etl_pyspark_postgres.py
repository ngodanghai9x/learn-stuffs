from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
from airflow.providers.postgres.operators.postgres import PostgresOperator
from datetime import datetime, timedelta

ETL_PATH = f"/home/gem/Documents/MyRepo/learn-stuffs/etl"
PROJECT_PATH = f"/home/gem/Documents/MyRepo/learn-stuffs/etl/pyspark_airflow"

PYSPARK_SCRIPT_PATH = f"{PROJECT_PATH}/scripts/etl_pyspark_script.py"
JDBC_JAR_PATH = f"{ETL_PATH}/libs/postgresql-42.7.4.jar"

# Định nghĩa DAG
default_args = {
    "owner": "airflow",
    "depends_on_past": False,
    "email_on_failure": False,
    "email_on_retry": False,
    "retries": 0,
    # "retry_delay": timedelta(minutes=5),
}

with DAG(
    dag_id="etl_pyspark_postgres",
    default_args=default_args,
    description="ETL pipeline using PySpark and PostgreSQL",
    schedule_interval="0 1 * * *",  # Chạy hàng ngày lúc 1:00 sáng
    start_date=datetime(2023, 12, 1),
    catchup=False,
) as dag:

    # Task 1: Extract - Kiểm tra và chuẩn bị dữ liệu
    extract_task = BashOperator(
        task_id="extract_data",
        bash_command="echo 'Extracting data from source...' && sleep 5",
    )

    # Task 2: Transform - Chạy PySpark để làm sạch dữ liệu
    transform_task = SparkSubmitOperator(
        task_id="transform_data",
        application=PYSPARK_SCRIPT_PATH,
        name="transform_data_job",
        conn_id="spark_default",
        jars=JDBC_JAR_PATH,
        application_args=[
            "--mode", "transform"
        ],
        verbose=True,
    )

    # Task 3: Load - Truncate bảng và ghi lại dữ liệu vào PostgreSQL
    load_task = PostgresOperator(
        task_id="load_data",
        postgres_conn_id="postgres_default",
        sql="""
        TRUNCATE TABLE public.cleaned_transactions;
        """,
        autocommit=True,
    )

    # Task 4: Chạy PySpark để ghi dữ liệu sau khi truncate
    write_task = SparkSubmitOperator(
        task_id="write_data",
        application=PYSPARK_SCRIPT_PATH,
        name="write_data_job",
        conn_id="spark_default",
        jars=JDBC_JAR_PATH,
        application_args=[
            "--mode", "load"
        ],
        verbose=True,
    )

    # Định nghĩa thứ tự thực thi
    extract_task >> transform_task >> load_task >> write_task
