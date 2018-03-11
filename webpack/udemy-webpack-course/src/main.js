require("babel-runtime/regenerator");
require("./main.css");
require("./index.html");

const a = async args => {
  const { a, b } = args;

  await console.log("Hello from the future!", a, b);
  console.log("Done");
};

a({ a: 1, b: 2 });
