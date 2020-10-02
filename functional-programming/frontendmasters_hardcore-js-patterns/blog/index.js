const { save, all } = require('../lib/db')
const { Task } = require('../lib/types')
const { liftF } = require('../lib/free')
const { last } = require('ramda')
const { taggedSum } = require('daggy')

const Console = taggedSum('Console', { Question: ['q'], Print: ['s'] })
const Db = taggedSum('Db', {
  Save: ['table', 'record'],
  All: ['table', 'query'],
})

const AuthorTable = 'Authors'
const Author = name => ({ name })

const PostTable = 'Posts'
const Post = (title, body) => ({ title, body })

// Thanks flavio!
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

const getInput = q =>
  Task((_rej, res) => readline.question(q, i => res(i.trim())))

// a -> m (a -> m (a -> m))
// Fix f -> f (Fix f)
// Fix Task -> Task (Fix Task)
// Free m -< m (Free m) | Pure
const menu = () =>
  question(
    'Where do you want to go today? (createAuthor, write, latest, all) '
  ).map(route => router[route] || menu)

const write = () =>
  question('Title: ')
    .chain(title => question('Body: ').map(body => Post(title, body)))
    .chain(post => dbSave(PostTable, post))
    .map(() => latest)

const formatPost = post => `\n${post.title}:\n${post.body}`

const writeOutput = s => Task((_rej, res) => res(console.log(s)))

const print = s => liftF(Console.Print(s))
const question = s => liftF(Console.Question(s))

const dbAll = (table, query) => liftF(Db.All(table, query))
const dbSave = (table, record) => liftF(Db.Save(table, record))

const latest = () =>
  dbAll(PostTable)
    .map(last)
    .map(formatPost)
    .chain(print)
    .map(() => menu)

const createAuthor = () =>
  question('Name? ')
    .map(name => Author(name))
    .chain(author => dbSave(AuthorTable, author))
    .map(() => menu)

// () -> Task () -> Task () ->
const start = () =>
  dbAll(AuthorTable).map(authors => (authors.length ? menu : createAuthor))

const router = { menu, createAuthor, write, latest }

const dbToTask = x =>
  x.cata({
    Save: save,
    All: all,
  })
const consoleToTask = x =>
  x.cata({
    Question: getInput,
    Print: writeOutput,
  })

const interpret = x =>
  x.table // cheat b/c both DB types have a table property
    ? dbToTask(x)
    : consoleToTask(x)

const runApp = f => f().foldMap(interpret, Task.of).fork(console.error, runApp)

runApp(start)
