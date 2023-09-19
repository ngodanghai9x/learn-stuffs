-- tạo user
CREATE USER 'newuser'@'%' IDENTIFIED BY 'password';
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
DROP USER 'username'@'localhost';

SHOW GRANTS FOR 'username'@'localhost';

-- gán full quyền trên `${database}.${table}` cho user mới
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
REVOKE ALL PRIVILEGES ON *.* FROM 'username'@'localhost';

GRANT type_of_permission ON database_name.table_name TO 'username'@'localhost';
REVOKE type_of_permission ON database_name.table_name FROM 'username'@'localhost';

-- apply việc gán quyền ngay
FLUSH PRIVILEGES;

/*
  Note: Depending on your MySQL user permissions, you may receive an error when executing the CREATE PROCEDURE command: 
  ERROR 1044 (42000): Access denied for user 'sammy'@'localhost' to database 'procedures'. To grant permissions to create 
  and execute stored procedures to your user, log in to MySQL as root and execute the following commands, replacing the MySQL 
  username and host as needed:
*/

GRANT CREATE ROUTINE, ALTER ROUTINE, EXECUTE on *.* TO 'sammy'@'localhost';
FLUSH PRIVILEGES;