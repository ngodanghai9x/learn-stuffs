-- 1. Basic Loop (Vòng lặp cơ bản)
-- Vòng lặp cơ bản sẽ chạy liên tục cho đến khi gặp lệnh EXIT.
-- Thích hợp cho các trường hợp khi điều kiện thoát được kiểm tra trong thân vòng lặp.
DECLARE
   counter NUMBER := 1;
BEGIN
   LOOP
      DBMS_OUTPUT.PUT_LINE('Counter: ' || counter);
      counter := counter + 1;
      
      -- Thoát vòng lặp khi counter > 5
      EXIT WHEN counter > 5;
   END LOOP;
END;
/

-- 2. WHILE Loop (Vòng lặp WHILE)
-- Điều kiện được kiểm tra trước khi thực hiện thân vòng lặp.
-- Nếu điều kiện sai ngay từ đầu, vòng lặp sẽ không chạy lần nào.
DECLARE
   counter NUMBER := 1;
BEGIN
   WHILE counter <= 5 LOOP
      DBMS_OUTPUT.PUT_LINE('Counter: ' || counter);
      counter := counter + 1;
   END LOOP;
END;
/

-- 3. FOR Loop (Vòng lặp FOR)
-- Chạy một số lần cố định dựa trên giá trị bắt đầu và kết thúc.
-- Tự động tăng giá trị của biến điều khiển sau mỗi lần lặp.
BEGIN
   FOR counter IN 1..5 LOOP
      DBMS_OUTPUT.PUT_LINE('Counter: ' || counter);
   END LOOP;
END;

BEGIN
   FOR counter IN REVERSE 5..1 LOOP
      DBMS_OUTPUT.PUT_LINE('Counter: ' || counter);
   END LOOP;
END;
/

-- 4. Cursor FOR Loop (Vòng lặp dùng con trỏ - Cursor)
-- Dùng để lặp qua từng dòng trong một tập kết quả (result set).
-- Oracle tự động mở, đọc và đóng con trỏ.
BEGIN
   FOR rec IN (SELECT employee_id, first_name FROM employees WHERE ROWNUM <= 5) LOOP
      DBMS_OUTPUT.PUT_LINE('Employee ID: ' || rec.employee_id || ', Name: ' || rec.first_name);
   END LOOP;
END;
/

-- 5. Nested Loops (Vòng lặp lồng nhau)
-- Kết hợp nhiều vòng lặp bên trong nhau.
BEGIN
   FOR i IN 1..3 LOOP
      FOR j IN 1..2 LOOP
         DBMS_OUTPUT.PUT_LINE('Outer Loop: ' || i || ', Inner Loop: ' || j);
      END LOOP;
   END LOOP;
END;
/

