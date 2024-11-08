import math 

print([1,2,3] * 3) # [1, 2, 3, 1, 2, 3, 1, 2, 3] # 

num_list = [1,2,3,4,5] # 
num_list.remove(2) # 
print(num_list) # [1, 3, 4, 5]

num_list=[21,13,19,3,11,5,18] # 
num_list.sort() # 
print(num_list) # [3, 5, 11, 13, 18, 19, 21]
print("median ", num_list[len(num_list)//2]) # median  13

print(float('nan') == math.nan) # False
print(math.isnan(float('nan'))) # True
my_set = set([1,1,2,2]) # 
print(my_set, list(my_set)) # {1, 2} [1, 2]

fruits = ["apple", "banana", "cherry"] # 
x, y, z = fruits # 
print(x) # 
print(y) # 
print(z) # 

x, y, z = [1,2,3] # 
print(x) # 
print(y) # 
print(z)