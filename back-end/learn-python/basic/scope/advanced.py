x = 10

def modify_global():
    global x
    x = 20

modify_global()
print(x)  # Kết quả: 20

# =======================

def outer():
    x = 10
    def inner():
        nonlocal x
        x = 20
    inner()
    print(x)  # Kết quả: 20, nếu k nonlocal thì là 10

outer()

