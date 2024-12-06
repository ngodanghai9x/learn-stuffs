import argparse
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_timestamp

def extract_data():
    print("Extracting data... (mock step)")
    # Thực hiện các bước extract thực tế nếu cần

def transform_data():
    print("Transforming data...")
    spark = SparkSession.builder.appName("Transform Data").getOrCreate()
    input_file = "/path/to/transactions_sample.csv"

    # Đọc và làm sạch dữ liệu
    df = spark.read.csv(input_file, header=True, inferSchema=True)
    df_cleaned = df.filter(col("amount").isNotNull()) \
        .withColumn("transaction_date", to_timestamp(col("transaction_date"), "yyyy-MM-dd HH:mm:ss"))
    df_cleaned.write.mode("overwrite").csv("/path/to/cleaned_data.csv")
    print("Data transformed and saved to cleaned_data.csv.")

def load_data():
    print("Loading data...")
    spark = SparkSession.builder \
        .appName("Load Data") \
        .config("spark.jars", "/path/to/postgresql-42.6.0.jar") \
        .getOrCreate()

    # Đọc dữ liệu đã làm sạch
    df_cleaned = spark.read.csv("/path/to/cleaned_data.csv", header=True, inferSchema=True)

    # Ghi vào PostgreSQL
    postgres_url = "jdbc:postgresql://localhost:5432/your_database"
    postgres_properties = {
        "user": "your_username",
        "password": "your_password",
        "driver": "org.postgresql.Driver"
    }
    df_cleaned.write.jdbc(url=postgres_url, table="public.cleaned_transactions", mode="append", properties=postgres_properties)
    print("Data loaded to PostgreSQL.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", required=True, help="Mode to run: extract, transform, load")
    args = parser.parse_args()

    if args.mode == "extract":
        extract_data()
    elif args.mode == "transform":
        transform_data()
    elif args.mode == "load":
        load_data()
    else:
        raise ValueError("Invalid mode. Choose from: extract, transform, load")
