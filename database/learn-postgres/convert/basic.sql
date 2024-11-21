-- 1. Hàm TO_CHAR: được sử dụng để chuyển đổi giá trị kiểu ngày giờ hoặc số thành chuỗi văn bản.
-- Chuyển đổi ngày giờ thành chuỗi
SELECT TO_CHAR(NOW(), 'YYYY-MM-DD') AS formatted_date; -- Kết quả: '2024-11-20'
SELECT TO_CHAR(NOW(), 'HH24:MI:SS') AS time_24h;       -- Kết quả: '14:35:42'
SELECT TO_CHAR(NOW(), 'Day, DD Month YYYY') AS full_date; -- Kết quả: 'Wednesday, 20 November 2024'

-- Chuyển đổi số thành chuỗi
SELECT TO_CHAR(12345.678, '99999.99') AS formatted_number; -- Kết quả: '12345.68'
SELECT TO_CHAR(12345.678, 'FM99999.00') AS no_leading_space; -- Kết quả: '12345.68'
SELECT TO_CHAR(0.5678, '0.00%') AS percentage; -- Kết quả: '56.78%'

-- 2. Hàm TO_TIMESTAMP: chuyển đổi chuỗi văn bản thành giá trị kiểu TIMESTAMP.
SELECT TO_TIMESTAMP('2024-11-20 14:35:42', 'YYYY-MM-DD HH24:MI:SS') AS timestamp_value;  -- Kết quả: 2024-11-20 14:35:42

-- Kết hợp với dữ liệu khác
SELECT TO_TIMESTAMP('20-Nov-2024', 'DD-Mon-YYYY') AS timestamp_value; -- Kết quả: 2024-11-20 00:00:00

-- 3. Hàm TO_DATE:chuyển đổi chuỗi văn bản thành giá trị kiểu DATE.
SELECT TO_DATE('20/11/2024', 'DD/MM/YYYY') AS date_value; -- Kết quả: 2024-11-20

-- 4. Hàm TO_NUMBER: chuyển đổi chuỗi văn bản thành giá trị kiểu số.
SELECT TO_NUMBER('12345.67', '99999.99') AS number_value; -- Kết quả: 12345.67
SELECT TO_NUMBER('56.78%', '99.99%') AS percentage_number; -- Kết quả: 56.78

-- 5. Hàm EXTRACT: lấy các thành phần cụ thể từ giá trị ngày giờ.
SELECT EXTRACT(YEAR FROM NOW()) AS current_year; -- Kết quả: 2024
SELECT EXTRACT(MONTH FROM NOW()) AS current_month; -- Kết quả: 11
SELECT EXTRACT(DAY FROM NOW()) AS current_day; -- Kết quả: 20
SELECT EXTRACT(HOUR FROM NOW()) AS current_hour; -- Kết quả: 14
SELECT EXTRACT(EPOCH FROM NOW()) AS current_epoch; -- Kết quả: 1732182503.092846 (Unix timestamp)

-- 6. Hàm AGE: Tính khoảng cách giữa hai giá trị ngày giờ.
SELECT AGE('2024-11-20', '2022-10-15') AS age_difference; -- Kết quả: 2 years 1 mon 5 days

-- 7. Hàm CAST: chuyển đổi dữ liệu từ kiểu này sang kiểu khác.
SELECT CAST('123.45' AS NUMERIC) AS numeric_value; -- Kết quả: 123.45
SELECT CAST(123 AS TEXT) AS text_value; -- Kết quả: '123'
SELECT CAST('2024-11-20' AS DATE) AS date_value; -- Kết quả: 2024-11-20

-- 8. Hàm :: (Toán tử chuyển đổi)
-- Cách khác để chuyển đổi kiểu dữ liệu.
SELECT '123.45'::NUMERIC AS numeric_value; -- Kết quả: 123.45
SELECT 123::TEXT AS text_value; -- Kết quả: '123'
SELECT '2024-11-20'::DATE AS date_value; -- Kết quả: 2024-11-20

-- 9. Kết hợp các hàm
-- Chuyển đổi chuỗi ngày giờ thành giá trị số
SELECT EXTRACT(EPOCH FROM TO_TIMESTAMP('2024-11-20 14:35:42', 'YYYY-MM-DD HH24:MI:SS')) AS epoch_time; 
-- Kết quả: 1737414942 (Unix timestamp)

-- Tạo chuỗi ngày giờ tùy chỉnh
SELECT TO_CHAR(TO_DATE('2024-11-20', 'YYYY-MM-DD'), 'Day, DD Month YYYY') AS formatted_date; 
-- Kết quả: 'Wednesday, 20 November 2024'

-- 10. Tạo dữ liệu mẫu và sử dụng thực tế
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    sale_date TIMESTAMP,
    amount NUMERIC
);
INSERT INTO sales (sale_date, amount)
VALUES
    ('2024-11-20 14:00:00', 123.45),
    ('2024-11-20 15:00:00', 678.90);

-- Lấy dữ liệu với định dạng chuỗi
SELECT TO_CHAR(sale_date, 'YYYY-MM-DD HH24:MI') AS formatted_date, amount
FROM sales;

-- Chuyển đổi chuỗi thời gian thành Unix timestamp
SELECT EXTRACT(EPOCH FROM sale_date) AS unix_timestamp
FROM sales;
