-- # 1. Tạo bảng với cột kiểu mảng
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    skills TEXT[]  -- Cột kiểu mảng
);

-- Chèn dữ liệu vào bảng
INSERT INTO employees (name, skills)
VALUES
    ('Alice', ARRAY['SQL', 'Python', 'Java']),
    ('Bob', ARRAY['C++', 'Go']),
    ('Charlie', ARRAY['Python', 'Rust']);

-- # 2. Truy vấn và làm việc với mảng
-- # Lấy giá trị trong mảng
SELECT name, skills[1] AS first_skill
FROM employees;

-- Tìm nhân viên có kỹ năng 'Python'
SELECT name
FROM employees
WHERE 'Python' = ANY(skills);

-- Tìm nhân viên có mọi kỹ năng đều là 'Python' hoặc 'SQL'
SELECT name
FROM employees
WHERE skills <@ ARRAY['Python', 'SQL'];

-- # 3. Cập nhật mảng
-- Thêm kỹ năng 'JavaScript' cho nhân viên có ID = 1
UPDATE employees
SET skills = array_append(skills, 'JavaScript')
WHERE id = 1;

-- Xóa kỹ năng 'Python' khỏi mảng của nhân viên có ID = 2
UPDATE employees
SET skills = array_remove(skills, 'Python')
WHERE id = 2;

-- Thay 'Java' bằng 'Kotlin' trong mảng của nhân viên có ID = 1
UPDATE employees
SET skills[3] = 'Kotlin'
WHERE id = 1;

-- # 4. Hàm và toán tử làm việc với mảng
-- Đếm số lượng kỹ năng của mỗi nhân viên
SELECT name, array_length(skills, 1) AS num_skills
FROM employees;

-- # Toán tử concatenation (||)
-- Kết hợp thêm mảng mới
UPDATE employees
SET skills = skills || ARRAY['Docker', 'Kubernetes']
WHERE id = 2;

-- # 5. Sử dụng mảng trong WHERE và GROUP BY
-- # Tìm kiếm với LIKE trong mảng
-- Tìm nhân viên có kỹ năng bắt đầu bằng 'Py'
SELECT name
FROM employees
WHERE EXISTS (
    SELECT 1
    FROM unnest(skills) AS skill
    WHERE skill LIKE 'Py%'
);

-- # Nhóm dữ liệu với mảng
-- Nhóm nhân viên theo số lượng kỹ năng
SELECT array_length(skills, 1) AS skill_count, COUNT(*)
FROM employees
GROUP BY skill_count;

-- # 6. Tạo mảng từ dữ liệu bảng
-- # Sử dụng hàm ARRAY_AGG()
-- Tạo một mảng chứa tất cả kỹ năng của nhân viên
SELECT ARRAY_AGG(skill)
FROM (
    SELECT UNNEST(skills) AS skill
    FROM employees
) AS all_skills;

-- # Tạo mảng với DISTINCT
-- Tạo mảng các kỹ năng duy nhất
SELECT ARRAY_AGG(DISTINCT skill)
FROM (
    SELECT UNNEST(skills) AS skill
    FROM employees
) AS unique_skills;

-- # 7. JSON to Array
-- Nếu dữ liệu ở dạng JSON, bạn có thể chuyển đổi nó sang mảng:
SELECT ARRAY(SELECT jsonb_array_elements_text('["SQL", "Python", "Rust"]'::jsonb));

-- # 8. Cột mảng trong JOIN
-- Tìm nhân viên có ít nhất một kỹ năng thuộc danh sách kỹ năng được cung cấp
SELECT e.name
FROM employees e
JOIN unnest(ARRAY['SQL', 'Python']) AS provided_skill ON provided_skill = ANY(e.skills);

-- Chuyển chuỗi thành mảng
SELECT string_to_array('Python,SQL,Java', ',') AS skills_array;

-- Chuyển mảng thành chuỗi
SELECT array_to_string(ARRAY['Python', 'SQL', 'Java'], ', ') AS skills_string;

-- Chuyển JSON array thành mảng
SELECT array_agg(jsonb_array_elements_text('["Python", "SQL", "Rust"]'::jsonb)) AS skills_array;
