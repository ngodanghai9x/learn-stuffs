SELECT *
FROM logs 
WHERE pw='correct' AND CASE WHEN id=1 THEN success=1 ELSE END 
AND YEAR(timestamp)=2011;

SELECT word
FROM words
WHERE word LIKE '%searchstring%'
ORDER BY
  CASE
    WHEN word LIKE 'searchstring' THEN 1
    WHEN word LIKE 'searchstring%' THEN 2
    WHEN word LIKE '%searchstring' THEN 4
    ELSE 3
  END;