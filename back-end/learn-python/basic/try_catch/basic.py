# Error types:
# ZeroDivisionError
# TypeError
# ValueError
# FileNotFoundError
# IndexError
# KeyError

# try - except - else
try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ZeroDivisionError:
    print("Cannot divide by zero.")
except ValueError:
    print("Invalid input! Please enter a valid number.")
else:
    # success flow: when no error caught
    print(f"Result is {result}.")
finally:
    print("Execution completed.")

# try - except all
try:
    result = 10 / "a"
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    print("Execution completed.")

# custom error
try:
    age = int(input("Enter your age: "))
    if age < 0:
        raise ValueError("Age cannot be negative!")
except ValueError as e:
    print(f"Error: {e}")




