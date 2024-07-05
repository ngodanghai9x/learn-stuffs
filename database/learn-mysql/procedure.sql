CREATE TABLE mytable (
    id INT,
    name VARCHAR(50),
    created_at DATE
)
PARTITION BY KEY(id)
PARTITIONS 4;

CREATE PROCEDURE insert_sample_data()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE year INT;
    DECLARE month INT;
    DECLARE day INT;
    DECLARE name VARCHAR(50);
    
    WHILE i <= 1000 DO
        SET name = CONCAT('Name_', i);
        SET year = FLOOR(1990 + (RAND() * 34));
        SET month = FLOOR(1 + (RAND() * 12));
        SET day = FLOOR(1 + (RAND() * 28)); -- Để tránh các vấn đề với tháng có ít hơn 31 ngày
        
        INSERT INTO mytable (id, name, created_at) VALUES (i, name, DATE(CONCAT(year, '-', LPAD(month, 2, '0'), '-', LPAD(day, 2, '0'))));
        
        SET i = i + 1;
    END WHILE;
END$$

DELIMITER ;

CALL insert_sample_data();

/*
- DELIMITER $$ dùng để phân cách bộ nhớ lưu trữ thủ tục Cache và mở ra một ô lưu trữ mới.
  - DELIMITER //
  - DELIMITER $$
- DEFINER=`root`@`localhost`  chính là tên người đã tạo.

REF: https://www.digitalocean.com/community/tutorials/how-to-use-stored-procedures-in-mysql
*/
-- prepare data
CREATE TABLE `cars` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`year` YEAR NULL DEFAULT NULL,
	`value` INT(10) NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;
INSERT INTO `cars` (`name`, `year`, `value`) VALUES 
  ('car1', '2023', '123'),
  ('car2', '2023', '22'),
  ('car3', '2022', '33'),
  ('car4', '2022', '100'),
  ('car5', '2021', '3');


-- #1
DELIMITER $$
-- DROP PROCEDURE IF EXISTS procedureName $$
CREATE DEFINER=`root`@`localhost` PROCEDURE procedureName(
  IN id INT(11),
  IN title VARCHAR(255)
)
BEGIN
  DECLARE total INT DEFAULT 0;
  SET a = 10;

  SELECT COUNT(*) INTO total FROM products;

  SELECT *  FROM products;
END; 
$$ DELIMITER;

CALL procedureName(12, 'Title1');

-- #2
DELIMITER //
-- DROP PROCEDURE IF EXISTS get_car_stats_by_year //;
DROP PROCEDURE IF EXISTS get_car_stats_by_year // DELIMITER;

DELIMITER //
CREATE PROCEDURE get_car_stats_by_year(
    IN year_filter int,
    OUT cars_number int,
    OUT min_value decimal(10, 2),
    OUT avg_value decimal(10, 2),
    OUT max_value decimal(10, 2)
)
BEGIN
    SELECT COUNT(*), MIN(value), AVG(value), MAX(value)
    INTO cars_number, min_value, avg_value, max_value
    FROM cars
    WHERE year = year_filter ORDER BY value DESC;

    SELECT year,COUNT(*), MIN(value), AVG(value), MAX(value)
    FROM cars
    GROUP BY year
    ORDER BY year DESC;
END;
// DELIMITER ;

SELECT @number, @min, @avg, @max;
CALL get_car_stats_by_year(2023, @number, @min, @avg, @max);
SELECT @number, @min, @avg, @max;