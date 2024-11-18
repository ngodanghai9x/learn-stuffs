CREATE OR REPLACE PACKAGE emp_pkg AS
  -- Public variable
  v_bonus_percent NUMBER;

  -- Public procedures
  PROCEDURE give_bonus(emp_id NUMBER, amount NUMBER);

  -- Public function
  FUNCTION get_employee_name(emp_id NUMBER) RETURN VARCHAR2;
END emp_pkg;

CREATE OR REPLACE PACKAGE BODY emp_pkg AS
  -- Initialize the public variable
  v_bonus_percent NUMBER := 0.1;

  -- Implementation of procedure
  PROCEDURE give_bonus(emp_id NUMBER, amount NUMBER) IS
  BEGIN
    UPDATE employees
    SET salary = salary + (amount * v_bonus_percent)
    WHERE employee_id = emp_id;
  END give_bonus;

  -- Implementation of function
  FUNCTION get_employee_name(emp_id NUMBER) RETURN VARCHAR2 IS
    v_name VARCHAR2(100);
  BEGIN
    SELECT first_name || ' ' || last_name
    INTO v_name
    FROM employees
    WHERE employee_id = emp_id;

    RETURN v_name;
  END get_employee_name;
END emp_pkg;
