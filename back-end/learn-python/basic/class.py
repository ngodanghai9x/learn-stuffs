class Person:
    # constructor()
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # toString()
    def __str__(self):
        return f"{self.name}({self.age})"

    def myfunc(self, random_num=1):
        print("Hello my name is " + self.name + " random " + str(random_num))


p1 = Person("John", 36)

print(p1.name)
print(p1.age)
print(p1)
print(p1.myfunc())
print(p1.myfunc(2))

# ===================
# Inheritance & super() & Multiple Inheritance
class Vehicle:
  def __init__(self, brand, model):
    self.brand = brand
    self.model = model

  def move(self):
    print("Move!")

class Car(Vehicle):
  pass

class Boat(Vehicle):
  def __init__(self, brand, model):
    super().__init__(brand, model)
    self.new_field = 2019
  
  def move(self):
    print("Sail!")

class MultipleInheritance(Car, Boat):
  pass

class Plane(Vehicle):
  def move(self):
    print("Fly!")

car1 = Car("Car Ford", "Mustang") #Create a Car object
boat1 = Boat("Boat Ibiza", "Touring 20") #Create a Boat object
plane1 = Plane("Plane Boeing", "747") #Create a Plane object
multipleInheritance1 = MultipleInheritance("MultipleInheritance Ford", "Mustang") #Create a MultipleInheritance object

for x in (car1, boat1, plane1, multipleInheritance1):
  print(x.brand, x.model, getattr(x, 'new_field', None))
  x.move()

# Car Ford Mustang
# Move!
# Boat Ibiza Touring 20
# Sail!
# Plane Boeing 747
# Fly!