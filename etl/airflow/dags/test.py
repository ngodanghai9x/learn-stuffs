import pandas as pd
from sqlalchemy import create_engine

import psycopg2

# Thử kết nối PostgreSQL đơn giản
try:
    connection = psycopg2.connect(
        host="0.0.0.0",
        database="postgres",
        user="postgres",
        password="postgres"
    )
    cursor = connection.cursor()
    print("PostgreSQL connection is successful!")
    cursor.close()
    connection.close()
except Exception as e:
    print("Error connecting to PostgreSQL:", e)

exit()

def save_to_postgres():
    # https://stackoverflow.com/questions/23103962/how-to-write-dataframe-to-postgres-table
    print('save data')
    postgres_url = 'postgresql://postgres:postgres@0.0.0.0:5432/postgres'
    # postgres_url = 'postgresql://postgres:w65DKtEOa8@172.16.12.105:5432/public'
    engine = create_engine(postgres_url)
    # df.to_sql('table_name', engine, if_exists='replace', index=False)
save_to_postgres()
exit()

df = pd.read_csv('/home/gem/Documents/MyRepo/learn-stuffs/etl/airflow/dags/temp/user_0col_0_0bytes.csv')

print(df.info())