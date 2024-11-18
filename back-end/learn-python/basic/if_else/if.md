1. Kiểu số (int, float, complex)
   0: Được coi là False.
   Bất kỳ số khác 0: Được coi là True.

    ```py
    if 0:  # False
        print("This won't execute")

    if 42:  # True
        print("This will execute")
    ```

2. Kiểu chuỗi (str)
   Chuỗi rỗng (""): Được coi là False.
   Chuỗi không rỗng: Được coi là True.

    ```py
    if "":  # False
        print("This won't execute")

    if "hello":  # True
        print("This will execute")
    ```

3. Kiểu danh sách, bộ (list, tuple, set, dict)
   Rỗng ([], (), {}, set()): Được coi là False.
   Không rỗng: Được coi là True.

    ```py
    if []:  # False
        print("This won't execute")

    if [1, 2, 3]:  # True
        print("This will execute")
    ```

4. Kiểu None
   None: Luôn được coi là False.

5. Kiểu đối tượng (class instance)
   Một đối tượng tùy chỉnh (instance của class):
   True nếu class không định nghĩa **bool** hoặc **len**, hoặc nếu **bool** trả về True.
   False nếu **bool** trả về False hoặc **len** trả về 0.

    ```python
    class MyClass:
    def __bool__(self):
        return False

    if MyClass():  # False
        print("This won't execute")
    ```

| Kiểu dữ liệu | Giá trị True                       | Giá trị False                 |
| ------------ | ---------------------------------- | ----------------------------- |
| int, float   | Số khác 0                          | 0                             |
| str          | Chuỗi không rỗng                   | Chuỗi rỗng ""                 |
| list, tuple  | Không rỗng                         | Rỗng                          |
| set, dict    | Không rỗng                         | Rỗng                          |
| None         | Không có                           | None                          |
| bool         | True                               | False                         |
| object       | Tùy thuộc vào `__bool__`/`__len__` | False nếu `__bool__` là False |
