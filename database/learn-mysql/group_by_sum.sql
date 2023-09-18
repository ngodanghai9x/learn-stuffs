SELECT
  br.patient_id,
  COUNT(br.id) AS total,
  COUNT(br.status) AS total2,
  SUM(IF(br.status = 'passed', 1, 0)) AS passed,
  SUM(IF(br.status = 'missed', 1, 0)) AS missed,
  SUM(IF(br.status = 'failed', 1, 0)) AS failed
FROM
  blow_result br
GROUP BY
  br.patient_id
ORDER BY
  failed DESC,
  missed DESC,
  passed DESC;

SELECT u.id,u.email, dd.department_id, t1.*
FROM user u 
LEFT JOIN p_department dd ON dd.patient_id = u.id 
LEFT JOIN (SELECT
  br.patient_id,
  COUNT(br.id) AS total,
  SUM(IF(br.status = 'passed', 1, 0)) AS passed,
  SUM(if(br.status = 'missed', 1, 0)) AS missed,
  SUM(if(br.status = 'failed', 1, 0)) AS failed
FROM
  blow_result br
GROUP BY
  br.patient_id
) as t1  ON t1.patient_id = u.id 
WHERE u.deleted_at is NULL 
ORDER BY
  failed DESC,
  missed DESC,
  passed DESC;

