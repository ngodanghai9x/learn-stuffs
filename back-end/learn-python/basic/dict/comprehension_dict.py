numbers = [{"num": 1}, {"num": 2}, {"num": 3}, {"num": 4}, {"num": 5}, {"num": 6}]

# Lọc các số lẻ và tạo một từ điển mới với khóa 'num' và giá trị là số lẻ
odd_numbers_dict = {
    item["num"]: item
    for item in numbers
    if item["num"] % 2 != 0
}

print(odd_numbers_dict)  # Output: {1: {'num': 1}, 3: {'num': 3}, 5: {'num': 5}}
