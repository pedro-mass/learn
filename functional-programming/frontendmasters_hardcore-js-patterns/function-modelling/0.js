const { List } = require('immutable-ext')
const { Either } = require('../lib/types')

const toUpper = x => x.toUpperCase()
const exclaim = x => x.concat('!')

const Fn = run => ({
  run,
  chain: f => Fn(x => f(run(x)).run(x)),
  map: f => Fn(x => f(run(x))),
  concat: other => Fn(x => run(x).concat(other.run(x))),
})

Fn.ask = x => Fn(x => x)
Fn.of = x => Fn(() => x)

// Monads do this: flatten functions into 1 function
// Fn((x) => Fn((y) => x, y))

// const res = Fn(toUpper)
//   .concat(Fn(exclaim))
//   .map(x => x.slice(3))
//   .run('fp sux')

// const res = Fn(toUpper)
//   .chain(upper => Fn(_ => exclaim(upper)))
//   .run('hi')
// console.log(res)

// Endo: Endomorphisms
// only works on types a -> a
// ex: String -> String
// Same type of input, as output

const Endo = run => ({
  run,
  concat: other => Endo(x => run(other.run(x))),
})
Endo.empty = () => Endo(x => x)

const res = List([toUpper, exclaim]).foldMap(Endo, Endo.empty()).run('hello') // HELLO!

console.log(res)

// (acc, a) -> acc
const Reducer = run => ({
  run,
  contramap: f => Reducer((acc, x) => run(acc, f(x))),
  concat: other => Reducer((acc, x) => other.run(run(acc, x), x)),
})

const checkCreds = (email, pass) => email === 'admin' && pass === 123

const login = payload => state =>
  payload.email
    ? Object.assign({}, state, {
        loggedIn: checkCreds(payload.email, payload.pass),
      })
    : state

const setPrefs = payload => state =>
  payload.prefs ? Object.assign({}, state, { prefs: payload.prefs }) : state

// const reducer = Reducer(login).concat(Reducer(setPrefs))
const reducer = Fn(login).map(Endo).concat(Fn(setPrefs).map(Endo))

const state = { loggedIn: false, prefs: {} }
const payload = { email: 'admin', pass: 123, prefs: { bgColor: '#000' } }

console.log(reducer.run(payload).run(state))

// exercises: https://codepen.io/drboolean/pen/qeqpgB
