# from pydantic import BaseModel, root_validator

# class User(BaseModel):
#     name: str
#     age: int
#     email: str

#     @root_validator(pre=True)
#     def check_name_age(cls, values):
#         name = values.get('name')
#         age = values.get('age')
#         if name == "John" and age < 18:
#             raise ValueError("John must be at least 18 years old.")
#         return values

# try:
#     user = User(name="John", age=17, email="john@example.com")
# except ValueError as e:
#     print(e)

from pydantic import BaseModel, field_validator, ValidationError

class User(BaseModel):
    name: str
    age: int
    email: str

    class Config:
        str_min_length = 1  # Đặt độ dài tối thiểu của chuỗi
        str_strip_whitespace = True  # Tự động loại bỏ khoảng trắng thừa


    @field_validator('age', mode='after') # will trigger after the pydantic validate and create object
    def check_name_age(cls, age, values):
        name = values.data.get('name')
        if name == "John" and age < 18:
            raise ValueError("John must be at least 18 years old.")
        return age

try:
    user = User(name="  John   ", age=17, email="")
    user = User(name="  John   ", age=17, email="john@example.com")
except ValidationError as e:
    print(e)
except Exception as e:
    print(e)
