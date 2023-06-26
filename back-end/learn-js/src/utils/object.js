
var person = {
  firstName: "John",
  lastName : "Doe",
  language : "NO",
  getFullName: function () {
    return this.firstName + " " + this.lastName;
  }
};

// Change a Property:
Object.defineProperty(person, "language", {
  value: "EN",
  writable : true,
  enumerable : true,
  configurable : true
});


const member = {
  firstName:"Hege",
  lastName: "Nilsen",
}

const member2 = {
  firstName:"Jon",
  lastName: "Snow",
}
let getFullName = person.getFullName.bind(member);
getFullName();

// person.bind(member2);
// member2.getFullName();