def tri_recursion(k):
  if(k > 0):
    result = k + tri_recursion(k - 1)
    print(result)
  else:
    result = 0
  return result

print("\n\nRecursion Example Results")
tri_recursion(6)


# lambda arguments : expression
x = lambda a, b : a * b
print(x(5, 6))

# ARGS
def my_function(*args):
  print("The youngest child is " + args[2])

my_function("Emil", "Tobias", "Linus")

# Default value
def my_function(country = "Norway"):
  print("I am from " + country)

my_function("Sweden")
my_function()

# Positional-Only Arguments
def my_function(x, /):
  print(x)

my_function(3)
# NOT: my_function(x = 3)

# Keyword-Only Arguments
def my_function(*, x):
  print(x)

my_function(x = 3)
# NOT: my_function(3)

# Combine Positional-Only and Keyword-Only
def my_function(a, b, /, *, c, d):
  print(a + b + c + d)

my_function(5, 6, c = 7, d = 8)