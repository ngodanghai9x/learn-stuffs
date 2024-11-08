# map & filter (like js)

numbers = [{"num": 1}, {"num": 2}, {"num": 3}, {"num": 4}, {"num": 5}, {"num": 6}]

# Lọc ra các số chẵn từ danh sách numbers
even_numbers = [item for item in numbers if item["num"] % 2 == 0]

print(even_numbers)  # Output: [{'num': 2}, {'num': 4}, {'num': 6}]

odd_numbers = [
  item.get("num", None)
  for item in numbers 
  if item.get("num", None) % 2 != 0
]

print(odd_numbers)  # Output: [1, 3, 5]
