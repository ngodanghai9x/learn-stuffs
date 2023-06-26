from pyspark.sql import SparkSession

spark = SparkSession.builder\
    .master("local[*]")\
    .appName('Us_stock_price')\
    .getOrCreate()

data = spark.read.csv('../stocks_price_final.csv', sep=',', header=True)

data.head(5)
data.show()
data.printSchema()
print(data.columns)
data.describe().show()
