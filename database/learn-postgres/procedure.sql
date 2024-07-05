CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    salary INT,
    department_id INT,
    hire_date DATE
);


CREATE OR REPLACE PROCEDURE insert_sample_data()
LANGUAGE plpgsql
AS $$
BEGIN
    FOR i IN 1..1000 LOOP
        INSERT INTO employees (name, salary, department_id, hire_date)
        VALUES (
            md5(random()::text),  -- Tạo tên ngẫu nhiên
            (random() * 100000)::INT,  -- Tạo lương ngẫu nhiên trong khoảng 0 đến 100000
            (random() * 10)::INT,  -- Tạo department_id ngẫu nhiên trong khoảng 0 đến 10
            '2020-01-01'::DATE + (random() * 1000)::INT * '1 day'::INTERVAL  -- Tạo hire_date ngẫu nhiên
        );
    END LOOP;
END;
$$;

CALL insert_sample_data();
