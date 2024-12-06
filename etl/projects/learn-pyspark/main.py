from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_timestamp
# import pyspark.sql.functions as F
import psycopg2

jdbc_jar_path = "../../libs/postgresql-42.7.4.jar"
# Khởi tạo Spark Session
spark = SparkSession.builder \
    .appName("ETL with PySpark") \
    .config("spark.jars", jdbc_jar_path) \
    .getOrCreate()

# Đường dẫn file CSV
input_file = "../../data/transactions.csv"

# Đọc dữ liệu từ file CSV
df = spark.read.csv(input_file, header=True, inferSchema=True)
df.show(15)

# Làm sạch dữ liệu
df_cleaned = df.filter(col("amount").isNotNull()) \
    .withColumn("transaction_date", to_timestamp(col("transaction_date"), "HH:mm:ss dd-MM-yyyy"))

# Hiển thị dữ liệu đã làm sạch
df_cleaned.show()

# Cấu hình kết nối PostgreSQL
postgres_url = "jdbc:postgresql://0.0.0.0:5432/postgres"
postgres_properties = {
    "user": "postgres",
    "password": "postgres",
    "driver": "org.postgresql.Driver"
}

'''
CREATE TABLE public.cleaned_transactions (
    transaction_id SERIAL PRIMARY KEY,
    branch_id TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    transaction_date TIMESTAMP NOT NULL
);
'''

# Ghi dữ liệu vào PostgreSQL
df_cleaned.write \
    .jdbc(url=postgres_url, table="public.cleaned_transactions", mode="overwrite", properties=postgres_properties)
    
# df.write.mode("overwrite").format("jdbc").option("url", hostMySQL).option(
#         "truncate", True).option("dbtable", "traction.cleaned_traction_values").option("user", "admin").option("password", passwordMySQL).save()

print("Dữ liệu đã được lưu vào PostgreSQL thành công!")
