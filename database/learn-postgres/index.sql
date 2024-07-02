CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    salary INT,
    department_id INT,
    hire_date DATE
);

INSERT INTO employees (name, salary, department_id, hire_date) VALUES
('Alice', 50000, 1, '2019-01-01'),
('Bob', 60000, 2, '2020-05-15'),
('Charlie', 55000, 1, '2021-07-20'),
('David', 45000, 3, '2018-03-10'),
('Eve', 70000, 2, '2022-11-25');


INSERT INTO employees (name, salary, department_id, hire_date)
SELECT
    md5(random()::text), 
    (random() * 100000)::INT, 
    (random() * 10)::INT, 
    '2020-01-01'::DATE + (random() * 1000)::INT * '1 day'::INTERVAL
FROM generate_series(1, 10000);

CREATE INDEX idx_salary ON employees (salary);

EXPLAIN ANALYZE
SELECT * FROM employees
ORDER BY salary;

-- Index Scan using idx_salary on employees  (cost=0.43..330.44 rows=10000 width=44) (actual time=0.029..7.421 rows=10000 loops=1)
--  Planning Time: 0.150 ms
--  Execution Time: 9.150 ms

