-- 1. Implicit Cursor (Con trỏ ngầm định)
-- Oracle tự động quản lý con trỏ này khi thực hiện các câu lệnh DML (INSERT, UPDATE, DELETE) hoặc câu lệnh SELECT INTO.
-- Không cần khai báo, Oracle tự mở, thực thi và đóng con trỏ.
DECLARE
   v_emp_name employees.first_name%TYPE;
BEGIN
   SELECT first_name
   INTO v_emp_name
   FROM employees
   WHERE employee_id = 100;

   DBMS_OUTPUT.PUT_LINE('Employee Name: ' || v_emp_name);
END;
/

-- 2. Explicit Cursor (Con trỏ tường minh)
-- Cần được khai báo, mở, thực thi và đóng theo cách thủ công.
-- Dùng để truy xuất nhiều hàng từ bảng.
-- CURSOR <cursor_name> IS <query>;
DECLARE
   CURSOR emp_cursor IS
      SELECT employee_id, first_name
      FROM employees
      WHERE department_id = 10;

   v_emp_id employees.employee_id%TYPE;
   v_emp_name employees.first_name%TYPE;
BEGIN
   OPEN emp_cursor; -- Mở con trỏ
   LOOP
      FETCH emp_cursor INTO v_emp_id, v_emp_name; -- Lấy từng dòng
      EXIT WHEN emp_cursor%NOTFOUND; -- Thoát khi hết dữ liệu
      DBMS_OUTPUT.PUT_LINE('Employee ID: ' || v_emp_id || ', Name: ' || v_emp_name);
   END LOOP;
   CLOSE emp_cursor; -- Đóng con trỏ
END;
/

-- 3. Parameterized Cursor (Con trỏ có tham số)
-- Cho phép truyền tham số khi mở con trỏ.
-- Tham số giúp con trỏ linh hoạt hơn khi áp dụng điều kiện khác nhau trong câu truy vấn.
-- CURSOR <cursor_name>(<parameter> datatype) IS <query>;
DECLARE
   CURSOR emp_cursor(p_dept_id NUMBER) IS
      SELECT employee_id, first_name
      FROM employees
      WHERE department_id = p_dept_id;

   v_emp_id employees.employee_id%TYPE;
   v_emp_name employees.first_name%TYPE;
BEGIN
   OPEN emp_cursor(10); -- Truyền tham số (department_id = 10)
   LOOP
      FETCH emp_cursor INTO v_emp_id, v_emp_name;
      EXIT WHEN emp_cursor%NOTFOUND;
      DBMS_OUTPUT.PUT_LINE('Employee ID: ' || v_emp_id || ', Name: ' || v_emp_name);
   END LOOP;
   CLOSE emp_cursor;
END;
/

-- 4. REF Cursor (Con trỏ tham chiếu)
-- Là kiểu con trỏ động, linh hoạt hơn con trỏ tường minh vì có thể được gán lại hoặc trả về từ một thủ tục/hàm.
-- Dùng khi truy vấn không cố định.
-- TYPE ref_cursor IS REF CURSOR;
DECLARE
   TYPE ref_cursor IS REF CURSOR; -- Khai báo kiểu REF Cursor
   emp_cursor ref_cursor;         -- Biến con trỏ
   v_emp_id employees.employee_id%TYPE;
   v_emp_name employees.first_name%TYPE;
BEGIN
   OPEN emp_cursor FOR
      SELECT employee_id, first_name
      FROM employees
      WHERE department_id = 10;

   LOOP
      FETCH emp_cursor INTO v_emp_id, v_emp_name;
      EXIT WHEN emp_cursor%NOTFOUND;
      DBMS_OUTPUT.PUT_LINE('Employee ID: ' || v_emp_id || ', Name: ' || v_emp_name);
   END LOOP;

   CLOSE emp_cursor;
END;
/

-- 5. Cursor FOR Loop (Duyệt con trỏ với vòng lặp FOR)
-- Oracle tự động mở, truy xuất dữ liệu, và đóng con trỏ khi kết thúc vòng lặp.
-- Không cần khai báo biến riêng để lưu kết quả.
BEGIN
   FOR rec IN (SELECT employee_id, first_name FROM employees WHERE department_id = 10) LOOP
      DBMS_OUTPUT.PUT_LINE('Employee ID: ' || rec.employee_id || ', Name: ' || rec.first_name);
   END LOOP;
END;
/