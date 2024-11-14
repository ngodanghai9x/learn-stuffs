## REFs:
- https://viblo.asia/p/tat-tan-tat-ve-airflow-p1-L4x5xqPwKBM#_cai-dat-airflow-bang-pip-5

## Requirements:
- lấy dữ liệu từ SFTP server
- Sử dụng pandas để lấy dữ liệu từ CSV file đẩy lên postgres

## Install guide:
````bash
sudo apt-get install -y --no-install-recommends \
        freetds-bin \
        krb5-user \
        ldap-utils \
        libffi6 \
        libsasl2-2 \
        libsasl2-modules \
        locales  \
        lsb-release \
        sasl2-bin \
        sqlite3 \
        unixodbc
        # libssl1.1 \

nano ~/.bashrc
#Type the following
# AIRFLOW_HOME=/c/Users/haind/airflow
AIRFLOW_HOME=~/airflow
AIRFLOW_VERSION=2.3.3
PYTHON_VERSION="$(python --version | cut -d " " -f 2 | cut -d "." -f 1-2)"
CONSTRAINT_URL="https://raw.githubusercontent.com/apache/airflow/constraints-${AIRFLOW_VERSION}/constraints-${PYTHON_VERSION}.txt"
source ~/.bashrc
#Press Ctrl+S and Ctrl+X to exit the editor
````

````bash
# Step 4: Install Apache Airflow
pip install "apache-airflow==${AIRFLOW_VERSION}" --constraint "${CONSTRAINT_URL}"
pip freeze > requirements.txt
pip install -r requirements.txt

mkdir -p ./dags ./logs ./plugins
echo -e "AIRFLOW_UID=$(id -u)" > .env

# Step 5: Initialize the Database
airflow standalone

````
