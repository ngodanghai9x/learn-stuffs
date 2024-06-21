#  start, stop (not include), step
for x in range(2, 30, 3):
  print(x)

# The else keyword in a for loop specifies a block of code to be executed when the loop is finished:
for x in range(6):
  print(x)
else:
  print("Finally finished!")

adj = ["red", "big", "tasty"]
fruits = ["apple", "banana", "cherry"]
for x in adj:
  for y in fruits:
    print(x, y)

# continue ~ continue (js): "jumps over" one iteration in the loop.
# break ~ break (js) : break out of loop, "jumps out" of a loop.

# for loops cannot be empty, but if you for some reason have a for loop with no content, put in the pass statement to avoid getting an error.
for x in [0, 1, 2]:
  pass