
-- 1. Procedure đơn giản: Thực hiện một hành động:  Cập nhật tất cả các bản ghi trong một bảng.
CREATE OR REPLACE PROCEDURE update_balance(amount NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Cập nhật tất cả balances với giá trị mới
    UPDATE accounts SET balance = amount WHERE balance < amount;
END;
$$;

-- Gọi procedure
CALL update_balance(5000);

-- 2. Procedure có sử dụng tham số IN và OUT:  Chấp nhận tham số đầu vào và trả về kết quả qua tham số đầu ra.
CREATE OR REPLACE PROCEDURE get_account_balance(
    account_id INT,
    OUT balance NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Lấy balance của account_id
    SELECT a.balance INTO balance -- # INTO
    FROM accounts a
    WHERE a.id = account_id;
END;
$$;

-- Gọi procedure và lấy giá trị trả về
CALL get_account_balance(1, balance_variable);

-- 3. Procedure với điều kiện kiểm tra:  Xử lý logic điều kiện, ví dụ thêm hoặc cập nhật bản ghi tùy thuộc vào điều kiện.
CREATE OR REPLACE PROCEDURE upsert_account(
    acc_id INT,
    acc_name TEXT,
    acc_balance NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM accounts WHERE id = acc_id) THEN
        -- Nếu tồn tại thì cập nhật
        UPDATE accounts
        SET name = acc_name, balance = acc_balance
        WHERE id = acc_id;
    ELSE
        -- Nếu không tồn tại thì thêm mới
        INSERT INTO accounts (id, name, balance)
        VALUES (acc_id, acc_name, acc_balance);
    END IF;
END;
$$;

-- Gọi procedure
CALL upsert_account(3, 'Alice', 7000);

-- 4. Procedure với vòng lặp (Loop):  Xử lý từng bản ghi theo logic cụ thể.
CREATE OR REPLACE PROCEDURE process_transactions()
LANGUAGE plpgsql
AS $$
DECLARE
    txn RECORD;
BEGIN
    -- Lặp qua từng giao dịch chưa xử lý
    FOR txn IN SELECT id, amount FROM transactions WHERE status = 'pending'
    LOOP
        -- Xử lý giao dịch
        UPDATE transactions
        SET status = 'processed'
        WHERE id = txn.id;

        RAISE NOTICE 'Processed transaction with ID: %', txn.id;
    END LOOP;
END;
$$;

-- Gọi procedure
CALL process_transactions();

-- 5. Procedure với CURSOR:  Sử dụng cursor để duyệt dữ liệu.
CREATE OR REPLACE PROCEDURE process_users()
LANGUAGE plpgsql
AS $$
DECLARE
    user_cursor CURSOR FOR SELECT id, name, balance FROM users WHERE balance < 1000;
    user_record RECORD;
BEGIN
    OPEN user_cursor;

    LOOP
        FETCH user_cursor INTO user_record;
        EXIT WHEN NOT FOUND;

        -- Xử lý từng bản ghi
        UPDATE users SET balance = balance + 500 WHERE id = user_record.id;
        RAISE NOTICE 'Updated balance for user ID: %', user_record.id;
    END LOOP;

    CLOSE user_cursor;
END;
$$;

-- Gọi procedure
CALL process_users();

-- 6. Procedure sử dụng truy vấn động (Dynamic SQL):  Thực thi các truy vấn được tạo động.
CREATE OR REPLACE PROCEDURE delete_data(table_name TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    EXECUTE format('DELETE FROM %I WHERE created_at < NOW() - INTERVAL ''30 days''', table_name);
END;
$$;

-- Gọi procedure
CALL delete_data('accounts');

-- 7. Procedure với Exception Handling:  Xử lý ngoại lệ (errors) trong quá trình thực thi.
CREATE OR REPLACE PROCEDURE safe_update_balance(amount NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE accounts SET balance = amount WHERE balance < amount;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM;
END;
$$;

-- Gọi procedure
CALL safe_update_balance(5000);