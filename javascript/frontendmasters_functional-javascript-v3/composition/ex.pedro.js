"use strict";

function increment(x) {
  return x + 1;
}
function decrement(x) {
  return x - 1;
}
function double(x) {
  return x * 2;
}
function half(x) {
  return x / 2;
}

function compose3(fn3, fn2, fn1) {
  return function(...args) {
    return fn3(fn2(fn1(...args)));
  };
}

function compose(...fns) {
  return function(arg) {
    return fns.reduceRight((lastResult, currFn) => {
      return currFn(lastResult);
    }, arg);
  };
}

function pipe(...fns) {
  return compose(...fns.reverse());
}

var f1 = compose(
  increment,
  decrement
);
var f2 = pipe(
  decrement,
  increment
);
var f3 = compose(
  decrement,
  double,
  increment,
  half
);
var f4 = pipe(
  half,
  increment,
  double,
  decrement
);
var f5 = compose(increment);
var f6 = pipe(increment);

console.log("tests");
console.log(f1(3) === 3);
console.log(f1(3) === f2(3));
console.log(f3(3) === 4);
console.log(f3(3) === f4(3));
console.log(f5(3) === 4);
console.log(f5(3) === f6(3));
