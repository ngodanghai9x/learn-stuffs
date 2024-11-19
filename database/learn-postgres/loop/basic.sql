-- 1. LOOP (vòng lặp cơ bản)
DO $$
DECLARE
    counter INT := 0;
BEGIN
    LOOP
        counter := counter + 1;

        RAISE NOTICE 'Counter: %', counter;

        -- Thoát vòng lặp nếu counter đạt 5
        IF counter >= 5 THEN
            EXIT;
        END IF;
    END LOOP;
END;
$$;

-- 2. WHILE Loop
DO $$
DECLARE
    counter INT := 0;
BEGIN
    WHILE counter < 5 LOOP
        counter := counter + 1;

        RAISE NOTICE 'Counter: %', counter;
    END LOOP;
END;
$$;

-- 3. FOR Loop (Dạng Range)
DO $$
BEGIN
    FOR i IN 1..5 LOOP
        RAISE NOTICE 'Current Value: %', i;
    END LOOP;
END;
$$;

-- 4. FOR Loop (Duyệt dữ liệu từ truy vấn)
DO $$
DECLARE
    user_record RECORD;
BEGIN
    FOR user_record IN
        SELECT id, name, balance FROM users WHERE balance > 1000
    LOOP
        RAISE NOTICE 'User ID: %, Name: %, Balance: %', user_record.id, user_record.name, user_record.balance;
    END LOOP;
END;
$$;


-- 5. FOREACH Loop (Mảng)
DO $$
DECLARE
    items TEXT[] := ARRAY['item1', 'item2', 'item3'];
    item TEXT;
BEGIN
    FOREACH item IN ARRAY items LOOP
        RAISE NOTICE 'Item: %', item;
    END LOOP;
END;
$$;

-- 6. NESTED Loop (Vòng lặp lồng nhau)
DO $$
BEGIN
    FOR i IN 1..3 LOOP
        FOR j IN 1..2 LOOP
            RAISE NOTICE 'Outer: %, Inner: %', i, j;
        END LOOP;
    END LOOP;
END;
$$;

-- 7. EXIT và CONTINUE
-- EXIT: Thoát khỏi vòng lặp ngay lập tức.
-- CONTINUE: Bỏ qua phần còn lại trong vòng lặp hiện tại và chuyển sang lần lặp tiếp theo.

-- 8. CURSOR Loop
DO $$
DECLARE
    user_cursor CURSOR FOR SELECT id, name FROM users;
    user_record RECORD;
BEGIN
    OPEN user_cursor;

    LOOP
        FETCH user_cursor INTO user_record;
        EXIT WHEN NOT FOUND;

        RAISE NOTICE 'User ID: %, Name: %', user_record.id, user_record.name;
    END LOOP;

    CLOSE user_cursor;
END;
$$;

