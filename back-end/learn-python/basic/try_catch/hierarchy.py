class ApplicationError(Exception):
    """Base class for all application errors."""
    def __str__(self):
        # Hiển thị tên lớp và thông báo lỗi
        return f"[{self.__class__.__name__}]: {super().__str__()}"

    pass

class DatabaseError(ApplicationError):
    """Exception raised for database-related errors."""
    def __init__(self, message="A database error occurred"):
        super().__init__(message)

class ValidationError(ApplicationError):
    """Exception raised for validation-related errors."""
    def __init__(self, message="Validation failed"):
        super().__init__(message)

# Sử dụng thử
try:
    raise DatabaseError("Cannot connect to the database")
except ApplicationError as e:
    print(f"Error caught: {e}, e.name= {e.__class__.__name__}")
