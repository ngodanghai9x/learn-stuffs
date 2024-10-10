-- table: employees
-- employee_id	name	salary
-- 1	Alice	5000
-- 2	Bob	6000
-- 3	Charlie	5500

-- table: salary_updates
-- employee_id	new_salary
-- 1	5200
-- 2	6200


UPDATE employees e
SET salary = CASE 
                WHEN su.new_salary IS NOT NULL THEN su.new_salary
                ELSE e.salary
             END
FROM (
    SELECT employee_id, new_salary 
    FROM salary_updates su1
    JOIN employees e1 ON e1.employee_id = su1.employee_id;
) su
WHERE e.employee_id = su.employee_id;

UPDATE traders st
SET pool_created_at = CASE
                        WHEN tmp.pool_id = st.pool_id THEN tmp.pool_created_at
                        ELSE st.pool_created_at
                    END
FROM (
    SELECT st1970.pool_id as pool_id, p.created_at as pool_created_at, st1970.pool_created_at as wrong
    FROM traders_1970_01 st1970
    JOIN solana_token_pools_bak p ON st1970.pool_id = p.id
    LIMIT 100
) tmp;
