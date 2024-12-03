-- 0.
CREATE OR REPLACE FUNCTION get_products_below_threshold(threshold_quantity INTEGER)
RETURNS TABLE(product_id INT, product_name TEXT, product_quantity INT) AS $$
DECLARE
    product_cursor CURSOR(threshold INTEGER) FOR
        SELECT id, name, quantity
        FROM products
        WHERE quantity < threshold;
BEGIN
    -- Mở cursor với tham số truyền vào
    OPEN product_cursor(threshold_quantity);

    -- Lặp qua từng dòng dữ liệu trong cursor
    LOOP
        FETCH product_cursor INTO product_id, product_name, product_quantity;
        EXIT WHEN NOT FOUND;
        
        -- Trả về từng dòng
        RETURN NEXT;
    END LOOP;

    -- Đóng cursor
    CLOSE product_cursor;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_products_below_threshold(10);

-- 1. Tạo Hàm Trả Về Cursor
CREATE OR REPLACE FUNCTION get_users_cursor(threshold_balance NUMERIC)
RETURNS REFCURSOR 
AS $$
DECLARE
    user_cursor REFCURSOR;
BEGIN
    -- Mở cursor với truy vấn cụ thể
    OPEN user_cursor FOR
        SELECT id, name, balance FROM users WHERE balance > threshold_balance;

    RETURN user_cursor;
END;
$$ LANGUAGE plpgsql;

-- 2. Sử Dụng Cursor Từ Hàm
DO $$
DECLARE
    user_cursor REFCURSOR;
    user_record RECORD;
BEGIN
    -- Gọi hàm để lấy cursor
    user_cursor := get_users_cursor(5000);

    -- Duyệt qua từng bản ghi trong cursor
    LOOP
        FETCH user_cursor INTO user_record;
        EXIT WHEN NOT FOUND;

        RAISE NOTICE 'ID: %, Name: %, Balance: %', user_record.id, user_record.name, user_record.balance;
    END LOOP;

    -- Đóng cursor sau khi sử dụng xong
    CLOSE user_cursor;
END;
$$;

-- 4. Tùy Biến Cursor Để Linh Hoạt Hơn
CREATE OR REPLACE FUNCTION get_dynamic_cursor(query TEXT)
RETURNS REFCURSOR AS $$
DECLARE
    dynamic_cursor REFCURSOR;
BEGIN
    -- Mở cursor với truy vấn động
    OPEN dynamic_cursor FOR EXECUTE query;

    RETURN dynamic_cursor;
END;
$$ LANGUAGE plpgsql;
-- using:
DO $$
DECLARE
    cur REFCURSOR;
BEGIN
    cur := get_dynamic_cursor('SELECT id, name FROM users WHERE balance > 5000');

    -- Fetch hoặc xử lý từ cursor
    FETCH ALL IN cur;

    CLOSE cur;
END;
$$;


