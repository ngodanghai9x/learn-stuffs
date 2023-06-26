# Tuple trong Python là một dạng dữ liệu mà các phần tử trong đó được xắp xếp theo thứ tự 
# và không thể thay đổi được giá trị sau khi được khai báo. Giá trị lưu giữ trong tuple có 
# thuộc tính bất biến, có nghĩa là bạn không thể thay đổi hoặc xóa phần tử sau khi tạo tuple.

# Tuple items are ordered, unchangeable, and allow duplicate values.
# Tuple items are indexed, the first item has index [0], the second item has index [1] etc.

def separate():
  print('----------------------------------------')

my_tuple = (0, 1, 2, 1, 4, 5)

print(my_tuple)
print('len= ' + str(len(my_tuple)))
print('count 1=', my_tuple.count(1))
print('index 1=', my_tuple.index(1))
separate()


# Access tuple
print('index 0', my_tuple[0])
print('index -2', my_tuple[-2])
print('index -1', my_tuple[-1])
print('index len - 1', my_tuple[len(my_tuple) - 1])
print('index range [1:4]', my_tuple[1:4])
print('index range [-1:-4]', my_tuple[-1:-4])
print("Yes, 1 in my_tuple", 1 in my_tuple)
separate()

# Unpack & Asterisk
(x, y, *z) = my_tuple
print(x, y, z)
separate()

(x, *y, z) = my_tuple
print(x, y, z)
separate()

(*x, y, z) = my_tuple
print(x, y, z)
separate()

# Update
temp = list(my_tuple)
temp[1] = "kiwi"
new_tuple = tuple(temp)
print(new_tuple)

temp_tuple = ("apple", "banana", "cherry")
y = ("orange",)
temp_tuple += y
print(temp_tuple)
separate()

# Join tuple
tuple1 = ("a", "b" , "c")
tuple2 = (1, 2, 3)
tuple3 = tuple1 + tuple2
print(tuple3)
separate()

tuple1 = ("apple", "banana", "cherry")
tuple2 = tuple1 * 2
print(tuple2)
separate()



