CREATE OR REPLACE FUNCTION update_user_balance(user_id INT, new_balance NUMERIC)
RETURNS INT AS $$
DECLARE
    result INT;
BEGIN
    -- Thực hiện cập nhật số dư tài khoản người dùng
    BEGIN
        IF user_id = 1 THEN
            RAISE EXCEPTION 'user_id cannot be 1';
        END IF;
    
        IF user_id IS NULL THEN
            RAISE EXCEPTION 'user_id cannot be NULL';
        END IF;

        result := user_id / new_balance;

        UPDATE users
        SET balance = new_balance
        WHERE id = user_id;

        -- Kiểm tra nếu không tìm thấy người dùng
        IF NOT FOUND THEN
            RAISE EXCEPTION 'User not found with ID %', user_id;
        END IF;

    EXCEPTION
        WHEN division_by_zero THEN
            -- Nếu gặp lỗi chia cho 0, thông báo lỗi và trả về NULL
            RAISE NOTICE 'Cannot divide by zero! errorCode: %, error: %', SQLSTATE, SQLERRM;
            result := NULL;
        WHEN others THEN
            -- Xử lý khi có lỗi xảy ra
            RAISE NOTICE 'Error updating balance for user ID %: errorCode: %, error: %', user_id, SQLSTATE, SQLERRM;
            result := NULL;
            RAISE EXCEPTION ' Ném lỗi để dừng thực thi user ID %: errorCode: %, error: %', user_id, SQLSTATE, SQLERRM;  -- Ném lỗi để dừng thực thi
    END;
    -- Trả về kết quả
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Gọi hàm:
SELECT update_user_balance(1, 500);  -- Nếu người dùng tồn tại, số dư sẽ được cập nhật
SELECT update_user_balance(2, 0);  -- Nếu người dùng tồn tại, số dư sẽ được cập nhật
SELECT update_user_balance(999, 500);  -- Nếu không tìm thấy người dùng, sẽ thông báo lỗi
