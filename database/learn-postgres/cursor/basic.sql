-- 1. Khai Báo Cursor Đơn Giản
DECLARE cursor_name CURSOR FOR query;

DO $$
DECLARE
    user_cursor CURSOR FOR SELECT id, name FROM users;
    user_record RECORD;
BEGIN
    OPEN user_cursor;

    LOOP
        FETCH user_cursor INTO user_record; -- # INTO
        EXIT WHEN NOT FOUND;

        RAISE NOTICE 'User ID: %, Name: %', user_record.id, user_record.name;
    END LOOP;

    CLOSE user_cursor;
END;
$$;

-- 2. Cursor VỚI Tùy Chọn (WITH HOLD hoặc SCROLL)
-- WITH HOLD: Giữ cursor sau khi kết thúc transaction.
-- SCROLL: Cho phép di chuyển tới lui qua các hàng trong tập kết quả.
DO $$
DECLARE
    user_cursor CURSOR WITH HOLD FOR SELECT id, name FROM users;
BEGIN
    OPEN user_cursor;
    -- Cursor vẫn tồn tại sau transaction này.
END;
$$;

-- 3. Khai Báo Cursor Với Tham Số
DO $$
DECLARE
    user_cursor CURSOR (threshold_balance NUMERIC) FOR
        SELECT id, name, balance FROM users WHERE balance > threshold_balance;
    user_record RECORD;
BEGIN
    OPEN user_cursor(5000);

    LOOP
        FETCH user_cursor INTO user_record;
        EXIT WHEN NOT FOUND;

        RAISE NOTICE 'ID: %, Name: %, Balance: %', user_record.id, user_record.name, user_record.balance;
    END LOOP;

    CLOSE user_cursor;
END;
$$;

-- 5. Sử Dụng Cursors Với FETCH Tùy Chọn
-- FETCH NEXT: Lấy hàng tiếp theo (mặc định).
-- FETCH PRIOR: Lấy hàng trước đó (yêu cầu SCROLL).
-- FETCH FIRST: Lấy hàng đầu tiên.
-- FETCH ABSOLUTE n: Nhảy đến hàng thứ n.
DO $$
DECLARE
    user_cursor CURSOR FOR SELECT id, name FROM users;
    user_record RECORD;
BEGIN
    OPEN user_cursor;

    -- Lấy hàng đầu tiên
    FETCH FIRST FROM user_cursor INTO user_record;
    RAISE NOTICE 'First Record: %, %', user_record.id, user_record.name;

    -- Lấy hàng tiếp theo
    FETCH NEXT FROM user_cursor INTO user_record;
    RAISE NOTICE 'Next Record: %, %', user_record.id, user_record.name;

    CLOSE user_cursor;
END;
$$;
