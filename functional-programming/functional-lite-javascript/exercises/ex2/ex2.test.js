const { x } = require("./ex2-pedro");

it("should remain the same value regardless of times called", () => {
  expect(x()).toBe(7);
  expect(x()).toBe(7);
  expect(x()).toBe(7);
  expect(x()).toBe(7);
});
