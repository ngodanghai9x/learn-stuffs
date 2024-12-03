-- 1. PERFORM
-- Mục đích: Dùng để chạy một câu lệnh SQL (SELECT) mà không cần trả lại kết quả.
-- Ngữ cảnh sử dụng: Chủ yếu được sử dụng khi bạn cần thực thi một câu lệnh SELECT chỉ để kích hoạt hiệu ứng phụ (side effects) mà không cần quan tâm đến kết quả trả về.

PERFORM some_function_call();
PERFORM column1 FROM table_name WHERE condition;

DO $$
BEGIN
    -- Gọi một hàm mà không cần lưu kết quả
    PERFORM my_function(param1, param2);

    -- Kiểm tra xem có tồn tại dòng nào trong bảng
    PERFORM 1 FROM my_table WHERE column_name = 'value';
END $$;

-- Lưu ý:
-- Nếu câu lệnh trả về kết quả nhưng không được sử dụng (ví dụ SELECT), PostgreSQL sẽ bỏ qua kết quả.


-- 2. EXECUTE
-- Mục đích: Dùng để thực thi một câu lệnh SQL được tạo ra động (dynamic SQL).
-- Ngữ cảnh sử dụng: Sử dụng trong trường hợp câu lệnh SQL không được xác định trước, mà được xây dựng trong lúc chạy (runtime).

EXECUTE 'SQL command as a string';

DO $$
DECLARE
    dynamic_sql TEXT;
BEGIN
    -- Tạo câu lệnh SQL động
    dynamic_sql := 'SELECT * FROM my_table WHERE column_name = ''value''';
    EXECUTE dynamic_sql;

    -- Chèn dữ liệu động vào bảng
    EXECUTE 'INSERT INTO ' || quote_ident('my_table') || ' (column1) VALUES (''dynamic_value'')';
END $$;

-- Lưu ý:
-- Dùng trong các trường hợp cần linh hoạt cao, nhưng có thể gây rủi ro SQL injection nếu không kiểm tra dữ liệu đầu vào cẩn thận.
-- Hỗ trợ binding tham số qua USING, ví dụ:
EXECUTE 'SELECT * FROM my_table WHERE column_name = $1' USING 'value';

-- Đặc điểm | PERFORM | EXECUTE
-- Loại câu lệnh | Thực thi lệnh SELECT không cần kết quả | Thực thi SQL động được xây dựng lúc chạy
-- Ngữ cảnh sử dụng | Gọi hàm, kiểm tra điều kiện | SQL động, cấu trúc câu lệnh không cố định
-- Cách viết | Dễ viết hơn, không cần chuỗi động | Cần tạo câu lệnh SQL động dưới dạng chuỗi
-- Rủi ro SQL injection | Không | Có, nếu không dùng cẩn thận