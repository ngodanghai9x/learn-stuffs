### ---- Run only one time ----
# echo 'mySecretKey123' > ~/.myapp_backup.key # Creating the key file:
# chmod 600 ~/.myapp_backup.key

# sudo apt install ccrypt 
# sudo apt-get install mysql-client
### ---- Run only one time ----

# Encrypting the backup:
# mysqldump --user="yourUsername" --password="yourPassword"  -h 0.0.0.0 app_dev1 | ccencrypt -k ~/.app_backup.key | bzip2 -c > ~/app_backup.sql.cpt.bz2
# mysqldump --user="yourUsername" --password="yourPassword"  -h 0.0.0.0 app_dev1 | ccrypt -k ~/.app_backup.key > ~/app_backup.sql.cpt
mysqldump --user="yourUsername" --password="yourPassword" -h 0.0.0.0 myapp_prod | ccencrypt -k ~/.myapp_backup.key > ~/myapp_backup.sql.cpt

# cat ~/myapp_backup.sql.cpt | less
# upload ~/myapp_backup.sql.cpt to s3 then delete the file
rm ~/myapp_backup.sql.cpt 





