# LEGB (Local, Enclosing, Global, Built-in).
x = 10  # Global scope

def outer():
    y = 20  # Enclosing scope
    
    def inner():
        z = 30  # Local scope
        print(x)  # Truy cập biến Global
        print(y)  # Truy cập biến Enclosing
        print(z)  # Truy cập biến Local

    # print(z)  # Sẽ gây lỗi, `z` không còn tồn tại
    inner()
outer()

# =======================

with open("advanced.py", "r") as file:
    content = file.read()  # Biến content được gán trong khối with

print('len', len(content))  # Vẫn có thể truy cập được ngoài khối with
# print(file)  # Sẽ gây lỗi, `file` không còn tồn tại

# =======================

class ManagedResource:
    def __enter__(self):
        print("Acquiring resource")
        return self  # Tài nguyên trả về chính đối tượng này
    
    def __exit__(self, exc_type, exc_value, traceback):
        print("Releasing resource")

with ManagedResource() as resource:
    print("Inside with block")
    # Biến `resource` chỉ tồn tại trong khối này

# print(resource)  # Sẽ gây lỗi, `resource` không còn tồn tại



