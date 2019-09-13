// [[1.2, 3.4], [0, 1]]
// transform rows to cols
// # rows = # cols

// const data = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
// in
// [012]
// [345]
// [678]
// out
// [036]
// [147]
// [258]

// console.log(data);

function transpose(data) {
  if (!data) throw new Error("data is required");

  if (data.length === 0) {
    return data;
  }

  if (data.some(col => col.length !== data.length))
    throw new Error("Column and row length not squared");

  if (!areAllNumbers(data)) {
    throw new Error("values must be numbers");
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data[i].length; j++) {
      const temp = data[j][i];
      data[j][i] = data[i][j];
      data[i][j] = temp;
    }
  }

  return data;
}

function areAllNumbers(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const val = data[i][j];
      if (isNaN(val) || typeof val !== "number") {
        return false;
      }
    }
  }

  return true;
}

console.log(transpose([[0, 1, 2], [3, 4, 5], [6, 7, 8]]));
console.log(transpose([]));
// console.log(transpose([["some", "thing"], ["a", "b"]]));
// console.log(transpose([["1", "2"], ["3", "4"]]));
