const { List } = require('immutable-ext')
const { Either } = require('./types')
const { Left, Right } = Either

const Success = (x) => ({
  isFail: false,
  x,
  fold: (f, g) => g(x),
  concat: (other) => (other.isFail ? other : Success(x)),
})

const Fail = (x) => ({
  isFail: true,
  x,
  fold: (f, g) => f(x),
  concat: (other) => Fail(other.isFail ? x.concat(other.x) : x),
})

const Validation = (run) => ({
  run,
  concat: (other) =>
    Validation((key, x) => run(key, x).concat(other.run(key, x))),
})

const isEmail = Validation((key, x) =>
  !!/@/.test(x) ? Success(x) : Fail([`${key} must be an email`])
)

// const isPresent = (x) => !!x
const isPresent = Validation((key, x) =>
  !!x ? Success(x) : Fail([`${key} needs to be present`])
)

const validate = (spec, obj) =>
  List(Object.keys(spec)).foldMap(
    (key) => spec[key].run(key, obj[key]),
    Success([obj])
  )

// testing code
const validations = {
  name: isPresent,
  email: isPresent.concat(isEmail),
}
const obj = { name: 'brian', email: 'brian@brian.com' }
const res = validate(validations, obj) // obj || [errors]

// console.log('V', res)
res.fold(console.error, console.log)

module.exports = { validate }
