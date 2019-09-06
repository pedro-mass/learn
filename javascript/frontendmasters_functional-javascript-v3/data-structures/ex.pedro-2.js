"use strict";

// inception!
// curry = curry(2, curry);
mapObj = curry(2, mapObj);
filterObj = curry(2, filterObj);
reduceObj = curry(3, reduceObj);

var nums = {
  first: [3, 5, 2, 4, 9, 1, 12, 3],
  second: [5, 7, 7, 9, 10, 4, 2],
  third: [1, 1, 3, 2]
};

var result = compose(
  reduceObj(sum)(0),
  mapObj(listProduct),
  filterObj(
    compose(
      isOdd,
      listSum
    )
  )
)(nums);
console.log({ expected: 38886, result });

// ************************************

function mapObj(mapperFn, o) {
  return Object.entries(o).reduce(
    (newObject, [key, val]) => ({ ...newObject, [key]: mapperFn(val) }),
    {}
  );
}

function filterObj(predicateFn, o) {
  return Object.entries(o).reduce((newObject, [key, value]) => {
    if (predicateFn(value)) newObject[key] = value;
    return newObject;
  }, {});
}

function reduceObj(reducerFn, initialValue, o) {
  return Object.values(o).reduce(reducerFn, initialValue);
}

// ************************************

function curry(arity, fn) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = prevArgs.concat([nextArg]);
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}
function compose(...fns) {
  return function composed(arg) {
    return fns.reduceRight((result, fn) => fn(result), arg);
  };
}
function pipe(...fns) {
  return compose(...fns.reverse());
}
function binary(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  };
}

// ************************************

function isOdd(v) {
  return v % 2 == 1;
}
function sum(x, y) {
  return x + y;
}
function mult(x, y) {
  return x * y;
}

function listSum(list) {
  return list.reduce(sum, 0);
}
function listProduct(list) {
  return list.reduce(mult, 1);
}
