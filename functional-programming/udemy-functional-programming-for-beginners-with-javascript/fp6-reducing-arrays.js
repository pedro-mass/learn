const reviews = [
  4.5,
  4.0,
  5.0,
  2.0,
  1.0,
  5.0,
  3.0,
  4.0,
  1.0,
  5.0,
  4.5,
  3.0,
  2.5,
  2.0
];

// 1. Using the reduce function, create an object that
// has properties for each review value, where the value
// of the property is the number of reviews with that score.
// for example, the answer should be shaped like this:
// { 4.5: 1, 4.0: 2 ...}

const countGroupedByReview = reviews.reduce(groupBy, {});

function groupBy(acc, review) {
  const count = acc[review] || 0;
  return { ...acc, [review]: count + 1 };
}

console.log(countGroupedByReview);
