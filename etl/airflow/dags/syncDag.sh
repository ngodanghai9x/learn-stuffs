# sh syncDag.sh migrate_dag.py
FILE_NAME="${1:-test_dag_local.py}"
date
rm -f ~/airflow/dags/$FILE_NAME
cp -rf $FILE_NAME ~/airflow/dags/$FILE_NAME
echo 'Copy file' $FILE_NAME 'done! => ls ~/airflow/dags/'
ls ~/airflow/dags/