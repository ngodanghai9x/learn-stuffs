class MyException(Exception):
    pass


class CustomError(Exception):
    """Custom Exception with a specific error message."""

    def __init__(self, message):
        super().__init__(message)  # Gọi constructor từ lớp cha
        self.message = message

# Sử dụng thử
try:
    raise CustomError("This is a custom error!")
except CustomError as e:
    print(f"Caught an error: {e}")


class MyCustomError(Exception):
    """Custom Exception with error code and additional info."""
    
    def __init__(self, message, error_code):
        super().__init__(message)  # Gọi constructor từ lớp cha
        self.message = message
        self.error_code = error_code

    def __str__(self):
        # Hiển thị thông tin chi tiết khi in lỗi
        return f"[Error {self.error_code}]: {self.message}"

# Sử dụng thử
try:
    raise MyCustomError("Invalid operation!", 400)
except MyCustomError as e:
    print(f"Caught an error: {e}")

