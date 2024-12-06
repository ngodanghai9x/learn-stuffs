## REFs:
- https://vivekjadhavr.medium.com/how-to-easily-install-apache-airflow-on-windows-6f041c9c80d2
- https://www.geeksforgeeks.org/how-to-create-first-dag-in-airflow/
- https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/operators.html
- https://airflow.apache.org/docs/apache-airflow-providers-sftp/stable/_api/airflow/providers/sftp/operators/sftp/index.html

- https://viblo.asia/p/bai-viet-ve-airflow-cho-nguoi-moi-nhu-minh-Ny0VGdaE4PA
- https://viblo.asia/p/cu-thuc-hanh-airflow-de-hieu-va-don-gian-da-chua-lam-gi-phuc-tap-ca-2oKLnxog4QO

## Mô tả pipeline:
- Step 1 (Extract): Dùng PySpark đọc file CSV từ S3 (sử dụng pyspark.sql và s3a:// URL).
- Step 2 (Transform): Làm sạch dữ liệu, thêm cột year_month, và tổng hợp dữ liệu.
- Step 3 (Load): Kết nối và ghi kết quả vào AWS Redshift thông qua JDBC.

## Install guide:
````bash
nano ~/.bashrc

#Type the following
# AIRFLOW_HOME=/c/Users/haind/airflow
AIRFLOW_HOME=~/airflow
# AIRFLOW_HOME=~/.local/lib/python3.10/site-packages/airflow
# export PATH=$PATH:~/.local/lib/python3.10/site-packages/airflow
# export PATH=$PATH:$AIRFLOW_HOME
source ~/.bashrc
#Press Ctrl+S and Ctrl+X to exit the editor
````

````bash
airflow db init
# Step 6: Create an Admin User
airflow users create    --username admin    --password admin     --firstname hai    --lastname ngo   --role Admin   --email haind@yopmail.com
# Step 7: Run the Web Server and Scheduler
airflow scheduler & airflow webserver --port 8050
````
