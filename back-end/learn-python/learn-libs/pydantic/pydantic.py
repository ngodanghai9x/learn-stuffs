from pydantic import BaseModel
from typing import List

class User(BaseModel):
    id: int
    name: str
    tags: List[str] = []

# Tạo một đối tượng User
user = User(id="123", name="Alice", tags=["admin", "user"])
print(user.dict())
