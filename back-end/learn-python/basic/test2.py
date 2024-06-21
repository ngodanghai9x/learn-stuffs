import math

print([1,2,3] * 3)

num_list = [1,2,3,4,5]
num_list.remove(2)
print(num_list)

num_list=[21,13,19,3,11,5,18]
num_list.sort()
print("median ", num_list[len(num_list)//2])

print(float('nan') == math.nan)
print(math.isnan(float('nan')))
my_set = set([1,1,2,2])
print(my_set, list(my_set))

fruits = ["apple", "banana", "cherry"]
x, y, z = fruits
print(x)
print(y)
print(z)

x, y, z = [1,2,3]
print(x)
print(y)
print(z)