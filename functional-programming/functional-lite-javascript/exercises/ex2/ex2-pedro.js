function foo(x, y) {
  return function() {
    return x + y;
  };
}

var x = foo(3, 4);

module.exports = {
  x
};

// x(); // 7
// x(); // 7
