class Person {
  // can only define like this thanks to typescript

  // this is public,
  name: string;
  private type: string;
  protected age: number = 27;

  // creates a username field on this object, and assigns it
  constructor(name: string, public username: string) {
    this.name = name;
  }

  printAge() {
    console.log(this.age);
    this.setType("old guy");
  }

  private setType(type: string) {
    this.type = type;
    console.log(this.type);
  }
}

// const person = new Person("Max", "maxUser");
// console.log(person);
// person.printAge();
// person.setType("Cool Guy");

// Inheritance
class Pedro extends Person {
  constructor(username: string) {
    super("Pedro", username);
    this.age = 31;
    // console.log(this.type);
  }
}
const pedro = new Pedro("root");
console.log(pedro);
