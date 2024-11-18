nums = [
    {'num': 1},
    {'num': 2},
    {'num': 3},
    {'num': 4},
    {'num': 5},
    {'num': 11},
]
find1 = next((item for item in nums if item.get('num') > 10), None)
filtered = list(filter(lambda item : item.get('num') > 10, nums))
# print("🐍 File: array/find.py | Line: 11 | undefined ~ filtered",filtered)
find2 = next(iter(filtered), None)
find3 = filtered[0] if filtered else None
last_item = [item for item in nums if item['num'] > 10]
print("🐍 ~ last_item",last_item)
print("🐍 ~ find1",find1)
print("🐍 ~ find2",find2)
print("🐍 ~ find3",find3)