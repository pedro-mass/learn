const { save, all } = require('../lib/db')
const { Task } = require('../lib/types')

// Thanks flavio!
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

const getInput = q =>
  Task((rej, res) => readline.question(q, i => res(i.trim())))

const AuthorTable = 'Authors'
const Author = name => ({ name })

// a -> m (a -> m (a -> m))
// Fix f -> f (Fix f)
// Fix Task -> Task (Fix Task)
// Free m -< m (Free m) | Pure
const menu = () =>
  getInput(
    'Where do you want to go today? (createAuthor, write, latest, all) '
  ).map(route => router[route] || menu)

const createAuthor = () =>
  getInput('Name? ')
    .map(name => Author(name))
    .chain(author => save(AuthorTable, author))
    .map(() => menu)

// () -> Task () -> Task () ->
const start = () =>
  all(AuthorTable).map(authors => (authors.length ? menu : createAuthor))

const router = { menu, createAuthor }

const runApp = f => f().fork(console.error, runApp)

runApp(start)
