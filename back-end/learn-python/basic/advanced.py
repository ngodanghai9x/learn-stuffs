def my_func(a, b, c):
    print(a, b, c)

args = (1, 2, 3)
my_func(*args)  # Tương đương với my_func(1, 2, 3)


def my_func(a, b, c=0):
    print(a, b, c)

kwargs = {'b': 2, 'c': 3}
my_func(1, **kwargs)  # Tương đương với my_func(1, b=2, c=3)
