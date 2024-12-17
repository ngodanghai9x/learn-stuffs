from pprint import pprint
from pydantic import BaseModel


class User(BaseModel):
    name: str
    age: int
    email: str

# Khởi tạo đối tượng User từ dict
user_data = {"name": "Alice", "age": 30, "email": "alice@example.com"}
user = User(**user_data)
# user = User.model_validate(user_data)
print('user', user)

user_dict = user.model_dump() # user.dict()
print('user_dict', user_dict)

json_data = user.model_dump_json() # user.json()
print(json_data)


class Product(BaseModel):
    id: int
    name: str
    price: float

data = {"id": 1, "name": "Laptop", "price": 999.99}
product = Product.model_validate(data) # Product.parse_obj(data)
print('product', product)


class Item(BaseModel):
    name: str
    price: float

json_data = '{"name": "Phone", "price": 499.99}'
item = Item.model_validate_json(json_data) # Item.parse_raw(json_data)
print(item)


