# examPackage()
n = int(input())
weightAmountMap = {}

for x in range(n):
  inputStr = input()
  [weight, amount] = inputStr.split(" ")
  temp = weightAmountMap.get(weight)
  weightAmountMap[weight] = int(temp if temp else  0) + int(amount)

m = int(input())
sortedWeights = list(weightAmountMap.keys())
sortedWeights = list(map(lambda string: int(string), sortedWeights))
sortedWeights.sort()

for weight in sortedWeights:
  temp = weightAmountMap.get(str(weight))
  m = m - int(temp if temp else  0)
  if m <= 0:
    print(weight)
    break


# weightAmountMap = {}

# for x in range(4):
#   [weight, amount] = "10 12".split(" ")
#   weight = str(weight)
#   print("weight",x, weight)
#   if x == 2: break
#   # if x == 2: pass

#   temp = weightAmountMap.get(weight)
#   print("temp", temp)
#   weightAmountMap[weight] = int(temp if temp else  0) + int(amount)

# print(weightAmountMap)
# sortedWeights = list(weightAmountMap.keys())
# sortedWeights.sort()
# arr = [3,2,5,2,8]
# arr.sort()
# print("sortedWeights", sortedWeights)
# print("arr", arr)
