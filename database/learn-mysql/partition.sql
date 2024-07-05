CREATE TABLE mytable (
    id INT,
    name VARCHAR(50),
    created_at DATE
)
PARTITION BY KEY(id)
PARTITIONS 4;

DELIMITER $$

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
