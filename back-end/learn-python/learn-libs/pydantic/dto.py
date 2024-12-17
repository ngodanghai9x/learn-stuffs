from pydantic import BaseModel, ValidationError, conint, constr

class UserBasic(BaseModel):
    username: constr(min_length=5, max_length=15)  # Chuỗi có độ dài từ 5 đến 15 ký tự
    age: conint(ge=18, le=100)  # Số nguyên từ 18 đến 100

try:
    user = UserBasic(username="ser", age=25)
    print(user)
except Exception as e:
    print(e)


from pydantic import BaseModel, Field

class User(BaseModel):
    username: str = Field(..., min_length=3, max_length=20, 
                        error_messages={"min_length": "Ít nhất 3 kí tự",
                                        "max_length": "Nhiều nhất 3 kí tự"})
    age: int = Field(..., ge=18, error_messages={"ge": "18+ only"})

# Kiểm tra với dữ liệu không hợp lệ
try:
    user = User(username="Jo", age=15)
except ValidationError as e:
    print(e)

