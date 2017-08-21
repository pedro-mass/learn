// console.log("It works!");

// number
let myAge = 27;
// myAge = "27";

// string
let myName = "Max";
// myName = 2;

// boolean
let hasHobbies = true;
// hasHobbies = 1;

// assign types
let myRealAge: number;
myRealAge = 27;
// myRealAge = '27';

// array
let hobbies: any[] = ["Cooking", "Cleaning"];
hobbies = [100];
// hobbies = 100;

// tuples
let address: [string, number] = ["street", 99];

// enum
enum Color {
  Gray, // 0
  Green = 100, // 1
  Blue = "Pedro" // 2
}
let myColor: Color = Color.Blue;
console.log(myColor);

// any - avoid since we lose the benefits of typescript
let car: any = "BMW";
console.log(car);
car = { brand: "bmw", series: 3 };
console.log(car);

// functions
function returnMyName(): string {
  return myName;
}
console.log(returnMyName());

// void - specifies that nothing will be returned
function sayHello(): void {
  console.log("hello");
  // return myName;
}

function multiply(value1: number, value2: number): number {
  return value1 * value2;
}

// function types
let myMultiply: (a: number, b: number) => number;
// myMultiply = sayHello;
myMultiply = multiply;

// objects
let userData: { name: string; age: number } = {
  name: "Max",
  age: 27
};
// userData: {
//   a: "",
//   b: 22
// };

// complex object
let complex: { data: number[]; output: (all: boolean) => number[] } = {
  data: [100, 3.99, 0],

  output(all: boolean): number[] {
    return this.data;
  }
};

// type alias
type Complex = { data: number[]; output: (all: boolean) => number[] };

let complex2: Complex = {
  data: [100, 3.99, 0],

  output(all: boolean): number[] {
    return this.data;
  }
};

// union types
let myRealRealAge: number | string = 27;
myRealRealAge = "27";
// myRealRealAge = true;

// check types
let finalValue = 20;
if (typeof finalValue == "number") {
  console.log("Final value is a number");
}
console.log(typeof complex2);
// if (typeof complex2 == "Complex") {
//   console.log("complex2 is Complex");
// }

// never - different from void b/c it does return something, an error
function neverReturns(): never {
  throw new Error("An error!");
}

// Nullable types - require a compiler option to be set
let canBeNull: number | null = 12;
canBeNull = null;
let canAlsoBeNull;
canAlsoBeNull = null;
let canThisBeAny: any | null = null;
canThisBeAny = 12;
