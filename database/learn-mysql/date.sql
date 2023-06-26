-- https://stackoverflow.com/questions/14769026/how-to-select-rows-that-have-current-days-timestamp
SELECT CURRENT_DATE() + INTERVAL 1 DAY;
SELECT CURRENT_DATE + INTERVAL 1 DAY;

SELECT * FROM `table` WHERE CAST(`timestamp` TO DATE) == CAST(NOW() TO DATE)
-- not use index
SELECT * FROM `table` WHERE DATE(`timestamp`) = CURDATE();

-- using index
SELECT * FROM `table` WHERE `timestamp` >= CURDATE()
  AND `timestamp` < CURDATE() + INTERVAL 1 DAY;