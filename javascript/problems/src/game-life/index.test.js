import * as gameLife from "./index";
import _ from "lodash";

describe("game-life", () => {
  const board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  describe("getNeighbors()", () => {
    [
      {
        name: "middle",
        input: [board, 1, 1],
        expected: [1, 2, 3, 4, 6, 7, 8, 9],
      },
      {
        name: "top left",
        input: [board, 0, 0],
        expected: [2, 4, 5],
      },
      {
        name: "bottom right",
        input: [board, 2, 2],
        expected: [5, 6, 8],
      },
      {
        name: "test-15",
        input: [
          [
            [0, 0, 0, 0, 0, 0],
            [0, 3, 4, 5, 0, 0],
            [0, 6, 1, 7, 1, 0],
            [0, 8, 9, 10, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          2,
          2,
        ],
        expected: [3, 4, 5, 6, 7, 8, 9, 10],
      },
    ].forEach((testCase) => {
      it(testCase.name, () => {
        expect(_.sortBy(gameLife.getNeighbors(...testCase.input))).toEqual(
          _.sortBy(testCase.expected)
        );
      });
    });
  });

  describe("next()", () => {
    [
      // {
      //   name: "empty board",
      //   input: [
      //     [0, 0, 0],
      //     [0, 0, 0],
      //     [0, 0, 0],
      //   ],
      //   expected: [
      //     [0, 0, 0],
      //     [0, 0, 0],
      //     [0, 0, 0],
      //   ],
      // },
      // {
      //   name: "live -> live neighors < 2",
      //   input: [
      //     [0, 0, 0],
      //     [0, 1, 0],
      //     [0, 0, 0],
      //   ],
      //   expected: [
      //     [0, 0, 0],
      //     [0, 0, 0],
      //     [0, 0, 0],
      //   ],
      // },
      // {
      //   name: "live -> live neighors = 2",
      //   input: [
      //     [1, 1, 0],
      //     [1, 0, 0],
      //     [0, 0, 0],
      //   ],
      //   expected: [
      //     [1, 1, 0],
      //     [1, 1, 0],
      //     [0, 0, 0],
      //   ],
      // },
      // {
      //   name: "live -> live neighors > 3",
      //   input: [
      //     [0, 1, 0],
      //     [1, 1, 1],
      //     [0, 0, 1],
      //   ],
      //   expected: [
      //     [1, 1, 1],
      //     [1, 1, 1],
      //     [0, 0, 1],
      //   ],
      // },
      {
        name: "test 15",
        input: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 1, 1, 1, 0],
          [0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
        expected: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0],
          [0, 1, 0, 0, 1, 0],
          [0, 1, 0, 0, 1, 0],
          [0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
        actual: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0],
          [0, 1, 1, 1, 1, 0],
          [0, 1, 1, 1, 1, 0],
          [0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
      },
    ].forEach((testCase) => {
      it(testCase.name, () => {
        const input = _.cloneDeep(testCase.input);
        gameLife.next(testCase.input);
        console.log({
          input,
          expected: testCase.expected,
          actual: testCase.input,
        });
        expect(testCase.input).toEqual(testCase.expected);
      });
    });
  });
});
