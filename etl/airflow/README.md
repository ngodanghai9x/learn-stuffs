## REFs:
- https://vivekjadhavr.medium.com/how-to-easily-install-apache-airflow-on-windows-6f041c9c80d2
- https://www.geeksforgeeks.org/how-to-create-first-dag-in-airflow/
- https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/operators.html
- https://airflow.apache.org/docs/apache-airflow-providers-sftp/stable/_api/airflow/providers/sftp/operators/sftp/index.html

## Requirements:
- lấy dữ liệu từ SFTP server
- Sử dụng pandas để lấy dữ liệu từ CSV file đẩy lên postgres

## Install guide:
````bash
nano ~/.bashrc

#Type the following
AIRFLOW_HOME=/c/Users/haind/airflow
AIRFLOW_HOME=/home/haind/airflow

#Press Ctrl+S and Ctrl+X to exit the editor
````

````bash
# Step 4: Install Apache Airflow
pip install apache-airflow
# Step 5: Initialize the Database
airflow db init
# Step 6: Create an Admin User
airflow users create    --username admin    --password admin     --firstname hai    --lastname ngo   --role Admin   --email admin@example.com
# Step 7: Run the Web Server and Scheduler
airflow webserver --port 8080
# different terminal
airflow scheduler
````
