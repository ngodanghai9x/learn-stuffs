-- Công ty XYZ có một hệ thống quản lý kho hàng cần được triển khai trong PostgreSQL. Yêu cầu như sau:
CREATE SCHEMA IF NOT EXISTS ex1;

CREATE TABLE ex1.products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    price NUMERIC NOT NULL
);

CREATE TABLE ex1.transactions (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES ex1.products(id),
    transaction_type TEXT CHECK (transaction_type IN ('import', 'export')),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO ex1.products (name, quantity, price) VALUES
('Product A', 50, 10.00),
('Product B', 20, 15.50),
('Product C', 5, 7.25),
('Product D', 0, 12.00);
INSERT INTO ex1.transactions (product_id, transaction_type, quantity) VALUES
(1, 'import', 50),
(2, 'import', 20),
(3, 'import', 5),
(4, 'import', 0),
(3, 'export', 2);

-- Kết quả mong đợi:
-- Thực hiện thao tác thêm/xóa giao dịch thông qua add_transaction.
-- Reset kho hàng qua reset_inventory.
-- Kiểm tra danh sách sản phẩm sắp hết hàng qua low_stock_report.

-- Cursor:
-- Tạo một function tên là low_stock_report để:
-- Duyệt qua các sản phẩm có số lượng nhỏ hơn 10 bằng cursor.
-- Trả về danh sách các sản phẩm có số lượng thấp.
CREATE OR REPLACE FUNCTION low_stock_report_cursor(quantityNo INT)
RETURNS REFCURSOR 
AS $$
DECLARE
    cursor1 REFCURSOR;
BEGIN
    -- Mở cursor với truy vấn cụ thể
    OPEN cursor1 FOR
        SELECT * FROM ex1.products WHERE quantity <= quantityNo;

    RETURN cursor1;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
    cursorRef REFCURSOR;
    product RECORD;
BEGIN
    cursorRef := low_stock_report_cursor(5);

    LOOP
        FETCH cursorRef INTO product;
        EXIT WHEN NOT FOUND;

        RAISE NOTICE 'ID: %, Name: %, Balance: %', product.id, product.name, product.quantity;
    END LOOP;

    -- Đóng cursor sau khi sử dụng xong
    CLOSE cursorRef;
END;
$$;


-- Procedure:
-- Xóa tất cả các bản ghi trong bảng transactions.
-- Đặt lại số lượng của tất cả các sản phẩm trong bảng products về 0.


-- function để:
-- Thêm một bản ghi vào bảng transactions.
-- Cập nhật số lượng (quantity) của sản phẩm trong bảng products.
-- Nếu số lượng xuất vượt quá số lượng hiện có trong kho, trả về lỗi.


-- Answer
CREATE OR REPLACE FUNCTION low_stock_report(threshold INT)
RETURNS TABLE(product_id INT, product_name TEXT, product_quantity INT) 
AS $$
DECLARE
    low_stock_cursor CURSOR FOR
        SELECT id, name, quantity
        FROM products
        WHERE quantity < threshold;
BEGIN
    -- Mở cursor và duyệt qua dữ liệu
    OPEN low_stock_cursor;

    LOOP
        FETCH low_stock_cursor INTO product_id, product_name, product_quantity;
        EXIT WHEN NOT FOUND;

        -- Trả về từng dòng
        RETURN NEXT;
    END LOOP;

    -- Đóng cursor
    CLOSE low_stock_cursor;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_transaction(product_id INT, transaction_type TEXT, txn_quantity INT)
RETURNS VOID 
AS $$
BEGIN
    -- Kiểm tra nếu loại giao dịch là "export" và số lượng không đủ
    IF transaction_type = 'export' THEN
        PERFORM quantity FROM products WHERE id = product_id AND quantity >= txn_quantity;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Không đủ số lượng sản phẩm trong kho!';
        END IF;

        -- Trừ số lượng sản phẩm
        UPDATE products
        SET quantity = quantity - txn_quantity
        WHERE id = product_id;
    ELSE
        -- Nếu là "import", cộng thêm số lượng
        UPDATE products
        SET quantity = quantity + txn_quantity
        WHERE id = product_id;
    END IF;

    -- Thêm giao dịch vào bảng transactions
    INSERT INTO transactions (product_id, transaction_type, quantity)
    VALUES (product_id, transaction_type, txn_quantity);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE reset_inventory()
AS $$
BEGIN
    -- Xóa tất cả giao dịch
    TRUNCATE TABLE transactions;

    -- Đặt lại số lượng sản phẩm về 0
    UPDATE products SET quantity = 0 WHERE id > 0;
END;
$$ LANGUAGE plpgsql;



-- Check result
SELECT add_transaction(1, 'export', 10); -- Xuất 10 sản phẩm A
SELECT add_transaction(3, 'import', 5);  -- Nhập 5 sản phẩm C

SELECT * FROM low_stock_report(10);

CALL reset_inventory();


