-- tạo user
CREATE USER 'newuser'@'%' IDENTIFIED BY 'password';
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
DROP USER 'username'@'localhost';

SHOW GRANTS FOR 'username'@'localhost';

-- gán full quyền trên database . table cho user mới
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
REVOKE ALL PRIVILEGES ON *.* FROM 'username'@'localhost';

GRANT type_of_permission ON database_name.table_name TO 'username'@'localhost';
REVOKE type_of_permission ON database_name.table_name FROM 'username'@'localhost';

-- apply việc gán quyền ngay
FLUSH PRIVILEGES;