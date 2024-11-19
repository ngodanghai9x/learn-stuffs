-- 1. Scalar Function (Hàm đơn trị)
CREATE OR REPLACE FUNCTION calculate_tax(price NUMERIC, tax_rate NUMERIC)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN price * tax_rate / 100;
END;
$$;

-- Gọi hàm:
SELECT calculate_tax(100, 10); -- Output: 10

-- 2. Table Function (Hàm bảng)
CREATE OR REPLACE FUNCTION get_users_above_balance(min_balance NUMERIC)
RETURNS TABLE(id INT, name TEXT, balance NUMERIC) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT id, name, balance FROM users WHERE balance > min_balance;
END;
$$;

-- Gọi hàm:
SELECT * FROM get_users_above_balance(1000);

-- 3. Aggregate Function (Hàm tổng hợp)
CREATE OR REPLACE FUNCTION custom_avg(numbers FLOAT[])
RETURNS FLOAT AS $$
DECLARE
    total FLOAT := 0; -- # :=
    count INT := array_length(numbers, 1);
BEGIN
    FOREACH total IN ARRAY numbers LOOP
        total := total + total;
    END LOOP;

    RETURN total / count;
END;
$$ LANGUAGE plpgsql;

-- Gọi hàm:
SELECT custom_avg(ARRAY[1, 2, 3, 4, 5]); -- Output: 3

-- 4. Trigger Function (Hàm kích hoạt)
CREATE OR REPLACE FUNCTION log_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO changes_log(table_name, operation, old_data, new_data, change_time)
    VALUES (TG_TABLE_NAME, TG_OP, OLD::TEXT, NEW::TEXT, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Áp dụng trigger:
CREATE TRIGGER after_update_log
AFTER UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION log_changes();

-- 5. Window Function (Hàm cửa sổ)
SELECT id, salary, 
       RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;

-- 6. Set-Returning Function (SRF)
CREATE OR REPLACE FUNCTION generate_series_custom(start INT, stop INT)
RETURNS SETOF INT AS $$
BEGIN
    FOR i IN start..stop LOOP
        RETURN NEXT i;
    END LOOP;
    RETURN;
END;
$$ LANGUAGE plpgsql;

-- Gọi hàm:
SELECT * FROM generate_series_custom(1, 5); -- Output: 1, 2, 3, 4, 5

-- 7. Procedure (Thủ tục)
CREATE OR REPLACE PROCEDURE update_balances(min_balance NUMERIC)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE users
    SET balance = balance + 100
    WHERE balance > min_balance;
END;
$$;

-- Gọi thủ tục:
CALL update_balances(1000);

-- 8. Inline SQL Function
CREATE OR REPLACE FUNCTION get_total_users()
RETURNS INT AS $$
    SELECT COUNT(*) FROM users;
$$ LANGUAGE sql;

-- Gọi hàm:
SELECT get_total_users(); -- Output: Số lượng người dùng

-- 9. Dynamic SQL Function
CREATE OR REPLACE FUNCTION dynamic_query(table_name TEXT)
RETURNS INT AS $$
DECLARE
    total INT;
BEGIN
    EXECUTE 'SELECT COUNT(*) FROM ' || table_name INTO total;
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Gọi hàm:
SELECT dynamic_query('users'); -- Output: Số lượng hàng trong bảng "users"

-- 10. Recursive Function
CREATE OR REPLACE FUNCTION factorial(n INT)
RETURNS INT AS $$
BEGIN
    IF n = 0 THEN
        RETURN 1;
    ELSE
        RETURN n * factorial(n - 1);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Gọi hàm:
SELECT factorial(5); -- Output: 120
