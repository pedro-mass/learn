const { mult } = require("./ex3-pedro");

it("should return 60", () => {
  expect(mult(3, 4, 5)).toBe(60);
});

it("should return something", () => {
  expect(mult(3, 4, 5, 6)).toBe(360);
});
