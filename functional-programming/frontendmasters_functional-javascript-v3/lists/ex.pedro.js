"use strict";

// Put your code here! :)

// 1.
const x = () => 1;
const y = () => 2;

// 2.
const add = (a, b) => a + b;
console.log({ question: 2, add: add(x(), y()) });

// 3.
const add2 = (fn1, fn2) => add(fn1(), fn2());
console.log({ question: 3, add2: add2(x, y) });

// 4.
const deferValue = value => () => value;
console.log({ question: 4, deferredValue: deferValue(5)() });

// 5.
// 5a. with a loop
// const addN = (...fns) => {
//   if (!fns && fns.length === 0) return;
//   if (fns.length === 1) return fns[0]();

//   const isOdd = num => num % 2 !== 0;
//   const isLastIndex = (arr, index) => index === arr.length - 1;

//   let value = 0;
//   for (let i = 0; i < fns.length; i += 2) {
//     const fn1 = fns[i];
//     const fn2 = fns[i + 1];

//     if (isOdd(fns.length) && isLastIndex(fns, i)) {
//       value = add2(fn1, deferValue(value));
//       break;
//     }

//     value += add2(fn1, fn2);
//   }

//   return value;
// };

// 5b. with recursion
// const addN = (...fns) => {
//   if (!fns && fns.length === 0) return;
//   if (fns.length === 1) return fns[0]();

//   const [fn1, ...otherFns] = fns;
//   return add2(fn1, deferValue(addN(...otherFns)));
// };

// 5c. with built-in array fn helpers
const addN = (...fns) => {
  if (!fns && fns.length === 0) return;

  return fns.reduce((accumulator, fn) => add2(deferValue(accumulator), fn), 0);
};

console.log({
  question: 5,
  "addn(): undefined": addN(),
  "addn(fn): 5": addN(deferValue(5)),
  "add(fn, fn): 3": addN(deferValue(1), deferValue(2)),
  "add(fn, fn, fn): 6": addN(deferValue(1), deferValue(2), deferValue(3)),
  "add(fn, fn, fn, fn): 10": addN(
    deferValue(1),
    deferValue(2),
    deferValue(3),
    deferValue(4)
  )
});

// 6.
const numbers = [1, 2, 3, 4, 5, 6, 4, 7, 8, 9, 9, 10];
const uniques = numbers.reduce((collection, num) => {
  if (!collection.includes(num)) {
    collection.push(num);
  }
  return collection;
}, []);
console.log({
  question: 6,
  uniques
});

// 7.
const isEven = num => num % 2 === 0;
const evens = numbers.filter(isEven);
console.log({
  question: 7,
  evens
});

// 8.
const sum = addN(...numbers.map(deferValue));
console.log({
  question: 8,
  sum
});
