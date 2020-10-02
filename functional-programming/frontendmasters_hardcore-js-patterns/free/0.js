const { liftF } = require('../lib/free')
const { Id, Task } = require('../lib/types')
const { taggedSum } = require('daggy')

// httpGet = (url) => HttpGet(url)

// HttpGet(url)
//   .chain(contents => HttpPost('/analytics', contents))

const Http = taggedSum('Http', { Get: ['url'], Post: ['url', 'body'] })

// Get('/home').cata({ // cata = catamorphism = pattern matching
//   Get: url => 'hi',
//   Post: (url, body) => 'post'
// })
// console.log(Http.Get('/home'))

// const interpret = () =>

const httpGet = url => liftF(Http.Get(url))
const httpPost = (url, body) => liftF(Http.Post(url, body))

const app = () =>
  httpGet('/home').chain(contents => httpPost('/analytics', contents))

// Free(Stuff).foldMap()

const interpret = x =>
  x.cata({
    Get: url => Id.of(`contents for ${url}`),
    Post: (url, body) => Id.of(`posted ${body} to ${url}`),
  })

const res = app().foldMap(interpret, Id.of)
console.log(res.extract())
