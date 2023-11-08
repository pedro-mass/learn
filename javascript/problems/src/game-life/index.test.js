import { getNeighbors } from "./index";

describe("Game Life", () => {
  describe("getNeighbors()", () => {
    const board = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    [
      {
        name: "center",
        input: [board, 1, 1],
        expectedOutput: [0, 1, 2, 3, 5, 6, 7, 8],
      },
      {
        name: "center-left",
        input: [board, 1, 0],
        expectedOutput: [0, 1, 4, 6, 7],
      },
      {
        name: "top-right",
        input: [board, 0, 2],
        expectedOutput: [1, 4, 5],
      },
    ].forEach((testCase) =>
      it(`should work on: ${testCase.name}`, () => {
        expect(getNeighbors(...testCase.input)).toEqual(
          testCase.expectedOutput
        );
      })
    );

    // it("should work on center", () => {
    //   expect(getNeighbors(board, 1, 1)).toEqual([0, 1, 2, 3, 5, 6, 7, 8]);
    // });
  });
});
