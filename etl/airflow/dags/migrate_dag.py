from datetime import datetime, timedelta
# from airflow import DAG
from airflow.models.dag import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from pytz import timezone
import pysftp
from urllib.parse import urlparse
import os
from sqlalchemy import create_engine
import pandas as pd


class Sftp:
    def __init__(self, hostname, username, password, port=22):
        """Constructor Method"""
        # Set connection object to None (initial value)
        self.connection = None
        self.hostname = hostname
        self.username = username
        self.password = password
        self.port = port

    def connect(self):
        """Connects to the sftp server and returns the sftp connection object"""

        try:
            # Get the sftp connection object
            self.connection = pysftp.Connection(
                host=self.hostname,
                username=self.username,
                password=self.password,
                port=self.port,
            )
        except Exception as err:
            raise Exception(err)
        finally:
            print(f"Connected to {self.hostname} as {self.username}.")

    def disconnect(self):
        """Closes the sftp connection"""
        self.connection.close()
        print(f"Disconnected from host {self.hostname}")

    def listdir(self, remote_path):
        """lists all the files and directories in the specified path and returns them"""
        for obj in self.connection.listdir(remote_path):
            yield obj

    def listdir_attr(self, remote_path):
        """lists all the files and directories (with their attributes) in the specified path and returns them"""
        for attr in self.connection.listdir_attr(remote_path):
            yield attr

    def download(self, remote_path, target_local_path):
        """
        Downloads the file from remote sftp server to local.
        Also, by default extracts the file to the specified target_local_path
        """

        try:
            print(
                f"downloading from {self.hostname} as {self.username} [(remote path : {remote_path});(local path: {target_local_path})]"
            )

            # Create the target directory if it does not exist
            path, _ = os.path.split(target_local_path)
            if not os.path.isdir(path):
                try:
                    os.makedirs(path)
                except Exception as err:
                    raise Exception(err)

            # Download from remote sftp server to local
            self.connection.get(remote_path, target_local_path)
            print("download completed")

        except Exception as err:
            raise Exception(err)

    def upload(self, source_local_path, remote_path):
        """
        Uploads the source files from local to the sftp server.
        """

        try:
            print(
                f"uploading to {self.hostname} as {self.username} [(remote path: {remote_path});(source local path: {source_local_path})]"
            )

            # Download file from SFTP
            self.connection.put(source_local_path, remote_path)
            print("upload completed")

        except Exception as err:
            raise Exception(err)

global_dfs = []
local_tz = timezone('Asia/Ho_Chi_Minh')
# remote_path = "/home/data_training/DATA"
remote_path = "./share"
# local_path = os.getcwd() + '/temp'
local_path = '/home/gem/Documents/MyRepo/learn-stuffs/etl/airflow/dags/temp'


def download_csv_by_sftp():
    print('get csv')
    # sftp_url = os.environ.get("SFTP_URL")
    # sftp_url = "sftp://data_training:training123a@!@172.16.10.117:22"
    sftp_url = "sftp://sftpuser:123456@172.16.13.251:22"

    if not sftp_url:
        print("First, please set environment variable SFTP_URL and try again.")
        exit(0)

    parsed_url = urlparse(sftp_url)
    print('parsed_url', parsed_url, parsed_url.username, parsed_url.password)

    sftp = Sftp(
        hostname=parsed_url.hostname,
        username=parsed_url.username,
        password=parsed_url.password,
    )

    # Connect to SFTP
    sftp.connect()
    print(f"List of files at location {remote_path}:")
    csv_files = sftp.listdir(remote_path)
    print(csv_files)

    # try:
    #     os.makedirs(local_folder)
    # except Exception as err:
    #     print('os.makedirs', err)
    #     # raise Exception(err)

    # Download files from SFTP
    for file_name in csv_files:
        sftp.download(
            os.path.join(remote_path, str(file_name)),
            os.path.join(local_path, str(file_name))
        )

    # Disconnect from SFTP
    sftp.disconnect()


def transform_data():
    global global_dfs
    global_dfs = []
    print('transform data')
    csv_files = os.listdir(local_path)
    print("🐍 local_listdir", csv_files)
    for file_name in csv_files:
        print("🐍 File:ir", file_name)
        try:
            df = pd.read_csv(os.path.join(local_path, str(file_name)))
            global_dfs.append(df)
            print(df.head(3))
        except:
            print('file_name_err', file_name)
transform_data()
# exit()

def save_to_postgres():
    global global_dfs
    if global_dfs is None:
        print("No data to save.")
        return

    # https://stackoverflow.com/questions/23103962/how-to-write-dataframe-to-postgres-table
    print('Saving data to PostgreSQL')
    postgres_url = 'postgresql://postgres:postgres@0.0.0.0:5432/postgres'
    engine = create_engine(postgres_url)
    table_name = 'users'
    dtypes_list = []

    for i, df in enumerate(global_dfs):
        dtypes_list.append(df.dtypes.rename(f"DataFrame_{i}"))
        # Sử dụng to_sql với if_exists='replace' để tạo bảng dựa trên schema của DataFrame
        try:
            # print('df.dtypes', df.dtypes)
            # df.to_sql(table_name, engine, if_exists='append', index=False)
            print(f"Data saved to table '{table_name}' successfully.")
        except Exception as e:
            print("Error saving data to PostgreSQL:", e)

    dtypes_df = pd.DataFrame(dtypes_list)
    print(dtypes_df.head(3))
    dtypes_df.to_csv(f"{local_path}/dataframes_schema/list.csv", index=True, mode='w')
    print("Schemas saved to dataframes_schema.csv.")

save_to_postgres()
# exit()


dag = DAG(
    dag_id='migrate_dag',
    default_args={
        'owner': 'airflow',
        'depends_on_past': False,
        'start_date': datetime(2024, 6, 25, tzinfo=local_tz),
        # 'start_date': datetime(2024, 6, 25),
        'retries': 1,
        'retry_delay': timedelta(minutes=5),
    },
    description='haind migrate_dag',
    tags=["haind"],
    schedule_interval='@once',
    # schedule_interval='* * * * *',
    # schedule_interval=timedelta(days=5),
)
# with dag as:

download_csv_by_sftp_job = PythonOperator(
    task_id='download_csv_by_sftp',
    python_callable=download_csv_by_sftp,
    dag=dag,
)

transform_data_job = PythonOperator(
    task_id='transform_data',
    python_callable=transform_data,
    dag=dag,
)

save_to_postgres_job = PythonOperator(
    task_id='save_to_postgres',
    python_callable=save_to_postgres,
    dag=dag,
)

download_csv_by_sftp_job >> transform_data_job >> save_to_postgres_job
