# sh syncDag.sh etl_pyspark_postgres.py
FILE_NAME="${1:-etl_pyspark_postgres.py}"
date
rm -f ~/airflow/dags/$FILE_NAME
cp -rf ./dags/$FILE_NAME ~/airflow/dags/$FILE_NAME
echo 'Copy file' $FILE_NAME 'done! => ls ~/airflow/dags/'
ls ~/airflow/dags/