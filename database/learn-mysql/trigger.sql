
use `demo_regex`;

SHOW TRIGGERS FROM `demo_regex` WHERE `Table` = 'user';

LOCK TABLES `user` WRITE;

DROP TRIGGER `after_user_insert`;
CREATE DEFINER=`admin`@`%` TRIGGER `after_user_insert` AFTER INSERT ON `user` FOR EACH ROW
INSERT INTO `demo_regex`.`user_audit` ( `user_id`, `user_name`, `user_source`, `is_priority`, `user`, `creation_date`, `audit_timestamp`, `type` )
VALUES( NEW.`user_id`, NEW.`user_name`, NEW.`user_source`, NEW.`is_priority`, NEW.`user`, NEW.`creation_date`, NEW.`audit_timestamp`, 'insert' );

DROP TRIGGER `after_user_update`;
CREATE DEFINER=`admin`@`%` TRIGGER `after_user_update` AFTER UPDATE ON `user` FOR EACH ROW
INSERT INTO `demo_regex`.`user_audit` ( `user_id`, `user_name`, `user_source`, `is_priority`, `user`, `creation_date`, `audit_timestamp`, `type` )
VALUES( OLD.`user_id`, OLD.`user_name`, OLD.`user_source`, OLD.`is_priority`, OLD.`user`, OLD.`creation_date`, OLD.`audit_timestamp`, 'update' );
 
DROP TRIGGER `after_user_delete`;
CREATE DEFINER=`admin`@`%` TRIGGER `after_user_delete` AFTER DELETE ON `user` FOR EACH ROW
INSERT INTO `demo_regex`.`user_audit` ( `user_id`, `user_name`, `user_source`, `is_priority`, `user`, `creation_date`, `audit_timestamp`, `type` )
VALUES( OLD.`user_id`, OLD.`user_name`, OLD.`user_source`, OLD.`is_priority`, OLD.`user`, OLD.`creation_date`, OLD.`audit_timestamp`, 'delete' );

UNLOCK TABLES;