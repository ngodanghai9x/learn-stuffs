
#! Note: Python does not have built-in support for Arrays, but Python Lists can be used instead.
# append()	Adds an element at the end of the list
# clear()	Removes all the elements from the list
# copy()	Returns a copy of the list
# count()	Returns the number of elements with the specified value
# extend()	Add the elements of a list (or any iterable), to the end of the current list
# index()	Returns the index of the first element with the specified value
# insert()	Adds an element at the specified position
# pop()	Removes the element at the specified position
# remove()	Removes the first item with the specified value
# reverse()	Reverses the order of the list
# sort()	Sorts the list

# Arrays need to be declared. Lists don't, since they are built into Python. In the examples above,
#   you saw that lists are created by simply enclosing a sequence of elements into square brackets.
#   Creating an array, on the other hand, requires a specific function from either the array module 
#  (i.e., array.array()) or NumPy package (i.e., numpy.array()). Because of this, lists are used more often than arrays.
# Arrays can store data very compactly and are more efficient for storing large amounts of data.
# Arrays are great for numerical operations; lists cannot directly handle math operations. For example,
#   you can divide each element of an array by the same number with just one line of code. If you try the
#   same with a list, you'll get an error.

import json
import numpy as np

try:
  array = np.array([3, 6, 9, 12])
  division = array/3
  print(array)
  # print(json.dumps(list(array))) #? why that doesn't work?

  # print(json.dump(array))
  print(division)
  print(type(division))
  print(array == division*3)
  print('json',json.dumps(list(division)))

  list = [3, 6, 9, 12]
  print(list)
  print (type(list))
  division = list/3
except:
  print("Something went wrong")

ages = [5, 12, 17, 18, 24, 32]

# FILTER

def myFunc(x):
  if x < 18:
    return False
  else:
    return True

adults = filter(myFunc, ages)
adults = filter(lambda x: myFunc(x), ages)

def my_filter(cb, arr):
  new_arr = []
  for item in arr:
    if (cb(item)):
      new_arr.append(item)
  return new_arr

adults2 = my_filter(myFunc, ages)
# adults2 = my_filter(lambda x: myFunc(x), ages)

for x in adults:
  print(x)