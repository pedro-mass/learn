namespace MyMath {
  const PI = 3.14;

  export function calculateCircumference(diameter: number) {
    return PI * diameter;
  }

  export function calculatArea(width: number, length: number) {
    return width * length;
  }
}

const PI = 20;

console.log(MyMath.calculatArea(10, 20));
console.log(MyMath.calculateCircumference(10));
console.log(PI);
