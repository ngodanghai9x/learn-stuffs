-- 1
IF NOT EXISTS( SELECT NULL
            FROM INFORMATION_SCHEMA.COLUMNS
           WHERE table_name = 'tablename'
             AND table_schema = 'db_name'
             AND column_name = 'columnname')  THEN

  ALTER TABLE `tablename` ADD `columnname` int(1) NOT NULL default '0';

END IF;

-- 2
CREATE TABLE IF NOT EXISTS `table_audit` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`id2` VARCHAR(70) NOT NULL COLLATE 'latin1_swedish_ci',
	`audit_timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	`type` VARBINARY(6) NOT NULL COMMENT 'insert; update; delete',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `idx_id2` (`id2`) USING BTREE
)
COLLATE='latin1_swedish_ci'
;

-- 3
DELIMITER $$
DROP PROCEDURE IF EXISTS `GetAllProducts`$$
 
CREATE PROCEDURE `GetAllProducts`()
BEGIN
   SELECT *  FROM products;
END $$
DELIMITER ;

-- 4