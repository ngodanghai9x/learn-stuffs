import argparse
import sys
from pprint import pprint
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_timestamp

ETL_PATH = f"/home/gem/Documents/MyRepo/learn-stuffs/etl"
PROJECT_PATH = f"/home/gem/Documents/MyRepo/learn-stuffs/etl/projects/pyspark_airflow"

PYSPARK_SCRIPT_PATH = f"{PROJECT_PATH}/scripts/etl_pyspark_script.py"
DATA_PATH = f"{ETL_PATH}/data"


def extract_data():
    print("Extracting data... (mock step)")
    # Thực hiện các bước extract thực tế nếu cần


def transform_data():
    print("Transforming data...")
    spark = SparkSession.builder.appName("Transform Data")\
        .config("spark.jars", PYSPARK_SCRIPT_PATH) \
        .getOrCreate()
    input_file = f"{DATA_PATH}/transactions.csv"
    output_file = f"{DATA_PATH}/cleaned_transactions.csv"

    # Đọc và làm sạch dữ liệu
    df = spark.read.csv(DATA_PATH, header=True, inferSchema=True)
    df_cleaned = df.filter(col("amount").isNotNull()) \
        .withColumn("transaction_date", to_timestamp(col("transaction_date"), "yyyy-MM-dd HH:mm:ss"))
    df_cleaned.write.mode("overwrite").csv(output_file)
    print("Data transformed and saved to cleaned_data.csv.")


'''
CREATE TABLE public.cleaned_transactions (
    transaction_id SERIAL PRIMARY KEY,
    branch_id TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    transaction_date TIMESTAMP NOT NULL
);
'''


def load_data():
    print("Loading data...")
    spark = SparkSession.builder \
        .appName("Load Data") \
        .config("spark.jars", PYSPARK_SCRIPT_PATH) \
        .getOrCreate()

    output_file = f"{DATA_PATH}/cleaned_transactions.csv"

    # Đọc dữ liệu đã làm sạch
    df_cleaned = spark.read.csv(output_file, header=True, inferSchema=True)

    # Ghi vào PostgreSQL
    postgres_url = "jdbc:postgresql://0.0.0.0:5432/postgres"
    postgres_properties = {
        "user": "postgres",
        "password": "postgres",
        "driver": "org.postgresql.Driver"
    }

    # Ghi dữ liệu vào PostgreSQL
    df_cleaned.write \
        .jdbc(url=postgres_url, table="public.cleaned_transactions", mode="overwrite", properties=postgres_properties)

    # df.write.mode("overwrite").format("jdbc").option("url", hostMySQL).option(
    #         "truncate", True).option("dbtable", "traction.cleaned_traction_values").option("user", "admin").option("password", passwordMySQL).save()

    print("Data loaded to PostgreSQL.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", required=True,
                        help="Mode to run: extract, transform, load")
    args = parser.parse_args()
    pprint('args', args)
    pprint('sys.argv', sys.argv)
    # sys.argv[1]
    if args.mode == "extract":
        extract_data()
    elif args.mode == "transform":
        transform_data()
    elif args.mode == "load":
        load_data()
    else:
        raise ValueError("Invalid mode. Choose from: extract, transform, load")
