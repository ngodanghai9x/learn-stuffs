CREATE SCHEMA emp_pkg;
CREATE TABLE emp_pkg.variables (
    name TEXT PRIMARY KEY,
    value NUMERIC
);

-- Khởi tạo giá trị biến
INSERT INTO emp_pkg.variables (name, value) VALUES ('v_bonus_percent', 0.1)
ON CONFLICT (name) DO UPDATE SET value = EXCLUDED.value;

CREATE OR REPLACE PROCEDURE emp_pkg.give_bonus(emp_id INT, amount NUMERIC) LANGUAGE plpgsql AS $$
DECLARE
    v_bonus_percent NUMERIC;
BEGIN
    -- Lấy giá trị biến từ bảng variables
    SELECT value INTO v_bonus_percent FROM emp_pkg.variables WHERE name = 'v_bonus_percent';

    -- Cập nhật lương nhân viên
    UPDATE employees
    SET salary = salary + (amount * v_bonus_percent)
    WHERE employee_id = emp_id;
END;
$$;

CREATE OR REPLACE FUNCTION emp_pkg.get_employee_name(emp_id INT) RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
    v_name TEXT;
BEGIN
    SELECT first_name || ' ' || last_name
    INTO v_name
    FROM employees
    WHERE employee_id = emp_id;

    RETURN v_name;
END;
$$;

