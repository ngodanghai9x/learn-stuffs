from datetime import datetime, timedelta
# from airflow import DAG
from airflow.models.dag import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from pytz import timezone

local_tz = timezone('Asia/Ho_Chi_Minh')

# Định nghĩa các hàm xử lý dữ liệu
def process_data():
    print('process data')
    
def save_data():
    print('save data')
    print()

dag = DAG(
    dag_id='test_dag_local',
    default_args={
        'owner': 'airflow',
        'depends_on_past': False,
        # 'start_date': datetime(2024, 6, 25, tzinfo=local_tz),
        'start_date': datetime(2024, 6, 25),
        'retries': 1,
        'retry_delay': timedelta(minutes=5),
    },
    description='haind DAG',
    tags=["haind"],
    schedule_interval='@once', 
    # schedule_interval='* * * * *',
    # schedule_interval=timedelta(days=5),
)
# with dag as:

# Định nghĩa các Task
task1 = BashOperator(
    task_id='task1',
    bash_command='echo "Task 1"',
    dag=dag,
)

task2 = PythonOperator(
    task_id='task2',
    python_callable=process_data,
    dag=dag,
)

task3 = PythonOperator(
    task_id='task3',
    python_callable=save_data,
    dag=dag,
)

task1 >> task2 >> task3