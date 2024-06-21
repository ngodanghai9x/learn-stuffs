import re

# string notation

## raw string notation
### #1
pattern = "\\."
string = "example.com"
result = re.findall(pattern, string)
print(result)  # Output: ['.']

### #2
pattern = r"\."
string = "example.com"
result = re.findall(pattern, string)
print(result)  # Output: ['.']


## f-string: format string notation
name = "Alice"
age = 30
f_string = f"Name: {name}, Age: {age}"
print(f_string)
# Output: Name: Alice, Age: 30

## Chuỗi đa dòng
multi_line_string = """This is a
multi-line string
that spans multiple lines."""
print(multi_line_string)
# Output:
# This is a
# multi-line string
# that spans multiple lines.

## Chuỗi định dạng
formatted_string = "Name: {}, Age: {}".format(name, age)
print(formatted_string)
# Output: Name: Alice, Age: 30

## Chuỗi byte
byte_string = b"Hello, world!"
print(byte_string)

# Output: b'Hello, world!'
# Làm việc với dữ liệu nhị phân
byte_string = b'\x50\x79\x74\x68\x6f\x6e'
print(byte_string)
# Output: b'Python'

## Chuỗi unicode (Python 2, mặc định trong Python 3)
unicode_string = u"Hello, world!"
print(unicode_string)
# Output: Hello, world!

## Kết hợp chuỗi thô và f-string
path = rf"C:\Users\{name}\Documents"
print(path)
# Output: C:\Users\Alice\Documents