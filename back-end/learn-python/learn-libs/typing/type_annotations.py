from typing import Optional

# Kiểu trả về có thể là int hoặc None
def parse_number(input_str: str) -> Optional[int]:
# def parse_number(input_str: str) -> int | None: # Python 3.10++
    try:
        return int(input_str)
    except ValueError:
        return None


from typing import List, Dict, Tuple, Set, Union

# Danh sách số nguyên
numbers: List[int] = [1, 2, 3, 4]
numbers: list[int] = [1, 2, 3, 4]

# Từ điển với key là chuỗi, value là số thực
person: Dict[str, float] = {"height": 1.75, "weight": 70.5}
person: dict[str, float] = {"height": 1.75, "weight": 70.5}

# Bộ giá trị 3 phần tử (chuỗi, số nguyên, số thực)
data: Tuple[str, int, float] = ("Alice", 30, 60.5)
data: tuple[str, int, float] = ("Alice", 30, 60.5)

# Tập hợp số nguyên
unique_numbers: Set[int] = {1, 2, 3}
unique_numbers: set[int] = {1, 2, 3}

# Union: Giá trị có thể là số nguyên hoặc chuỗi
value: Union[int, str] = "Hello"
value: int | str = "Hello"  # Python 3.10++
value = 42  # Cũng hợp lệ


from typing import Callable

def execute_function(func: Callable[[int, int], int], x: int, y: int) -> int:
    return func(x, y)

def add(a: int, b: int) -> int:
    return a + b

print(execute_function(add, 3, 5))  # Output: 8


from typing import TypeVar

T = TypeVar('T')  # T là một kiểu bất kỳ (Generics)

def repeat(value: T, count: int) -> List[T]:
    return [value] * count

print(repeat(42, 3))        # Output: [42, 42, 42]
print(repeat("Hi", 2))      # Output: ['Hi', 'Hi']


