const mult = (...args) => {
  if (args.length <= 2) {
    return args[0] * args[1];
  }
  return args[0] * mult(...args.slice(1));
};

// const mult = (...args) =>
//   args.length === 2 ? args[0] * args[1] : args[0] * mult(...args.slice(1));

module.exports = { mult };
