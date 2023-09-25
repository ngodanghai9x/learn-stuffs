SELECT *
FROM orders
WHERE value LIKE ? AND fct_status_id IN (?)
ORDER BY value = ? DESC, (value LIKE ?) DESC, value
LIMIT ?;

SELECT * 
FROM schedules
ORDER BY start_date = '2023-09-25' DESC, start_date IN ('2023-08-24', '2023-09-11' ) DESC, start_date ASC
LIMIT 20;