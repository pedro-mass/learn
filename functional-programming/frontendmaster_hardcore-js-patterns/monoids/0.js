const { List, Map } = require('immutable-ext')

// Semigroup = Closed + Associative
// monoid = Semigroup + Identity

// .empty() => acting like the identity

const Sum = (x) => ({
  x,
  concat: (other) => Sum(x + other.x),
})
Sum.empty = () => Sum(0)

const Product = (x) => ({
  x,
  concat: (other) => Product(x * other.x),
})
Product.empty = () => Product(1)

const Any = (x) => ({
  x,
  concat: (other) => Any(x || other.x),
})
Any.empty = () => Any(false)

const All = (x) => ({
  x,
  concat: (other) => All(x && other.x),
})
All.empty = () => All(true)

// const res = Sum(5).concat(Sum(3))
// const res = Product(5).concat(Product(3))
// const res = Any(true).concat(Any(false))
// const res = Any(false).concat(Any(false))
// const res = Product(1).concat(Product(10))
// const res = Product.empty().concat(Product(10))
// const res = [1, 2, 3, 4, 5].map(Sum).reduce((acc, n) => acc.concat(n))
// const res = [].map(Sum).reduce((acc, n) => acc.concat(n), Sum.empty())

const Intersection = (x) => ({
  x,
  concat: (other) => Intersection(x && other.x),
})
// what would be the identity/empty?
// Intersection([1,2,3]).concat(Intersection(?)) = [1,2,3]
// there isn't one, so intersection is NOT a Monoid, but it is a semigroup

// Union.empty() = []
// so Union would be a Monoid

const res = List([true, true]).foldMap(All, All.empty())

console.log(res)
