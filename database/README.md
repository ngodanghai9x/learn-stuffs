| **Tiêu chí**                | **Function**                           | **Procedure**                         |
|-----------------------------|----------------------------------------|---------------------------------------|
| **Trả về giá trị**          | Phải trả về một giá trị.               | Không cần trả về giá trị.             |
| **Cách sử dụng trong SQL**  | Có thể sử dụng trong câu lệnh SQL (ví dụ trong `SELECT`, `WHERE`, `ORDER BY`, v.v.). | Không thể sử dụng trực tiếp trong câu lệnh SQL, cần gọi thông qua `CALL`. |
| **Mục đích chính**          | Chủ yếu để tính toán và trả về kết quả. | Chủ yếu để thực hiện các tác vụ quản lý hoặc thay đổi trạng thái của dữ liệu. |
| **Câu lệnh gọi**            | `SELECT function_name(...)` hoặc sử dụng trong biểu thức SQL. | `CALL procedure_name(...)`.          |
| **Loại dữ liệu trả về**     | Có thể là bất kỳ kiểu dữ liệu nào, kể cả `SETOF` hoặc `TABLE`. | Không trả về dữ liệu.                |
| **Tính năng hỗ trợ giao dịch** | Không thể kiểm soát giao dịch trực tiếp (không thể commit hay rollback trong function). | Có thể kiểm soát giao dịch, ví dụ như commit hoặc rollback. |
| **Tác vụ trong hàm**        | Hạn chế các tác vụ thay đổi dữ liệu (không nên có `INSERT`, `UPDATE`, `DELETE` trừ khi cần thiết). | Thường dùng để thay đổi dữ liệu, ví dụ như `INSERT`, `UPDATE`, `DELETE`. |
| **Khả năng tái sử dụng**    | Có thể được sử dụng nhiều lần trong SQL, ví dụ cho các phép toán hoặc biểu thức. | Thường chỉ được gọi khi cần thực hiện một loạt các tác vụ không trả về kết quả. |
| **Tính linh hoạt**         | Linh hoạt trong việc sử dụng trong các câu truy vấn SQL phức tạp. | Thích hợp cho việc thực thi các tác vụ quản lý lớn và không cần trả về kết quả. |
