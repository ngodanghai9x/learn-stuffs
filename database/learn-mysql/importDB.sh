# GUIDE:
# step 1: run this file, then:
# step 2: re-deploy application (BE service)

# download encrypted backup file from s3, then save it as ~/myapp_backup.sql.cpt
# cat ~/app_backup.sql.cpt.bz2 | ccdecrypt -k ~/.app_backup.key | bunzip2 -c | less
# cat ~/app_backup.sql.cpt | ccrypt -k ~/.app_backup.key | less
# cat ~/app_backup.sql.cpt | ccdecrypt -k ~/.app_backup.key | less
# cat ~/app_backup.sql.cpt | less
ccdecrypt ~/myapp_backup.sql.cpt -k ~/.myapp_backup.key --tmpfiles --force

mysql --user="yourUsername" --password="yourPassword" -h 0.0.0.0 -e "DROP DATABASE IF EXISTS myapp_prod; CREATE DATABASE IF NOT EXISTS myapp_prod;"
mysql --user="yourUsername" --password="yourPassword" -h 0.0.0.0 myapp_prod < ~/myapp_backup.sql

rm ~/myapp_backup.sql 
