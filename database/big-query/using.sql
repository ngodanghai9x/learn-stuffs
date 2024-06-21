SELECT
  employee_id,
  department,
  salary,
  RANK() OVER (
    PARTITION BY
      department
    ORDER BY
      salary DESC
  ) AS salary_rank
FROM
  employees
QUALIFY
  salary_rank = 1;


SELECT
  employee_id,
  department,
  salary,
  NTILE(4) OVER (
    PARTITION BY
      department
    ORDER BY
      salary DESC
  ) AS quartile
FROM
  employees
QUALIFY
  quartile = 1;
