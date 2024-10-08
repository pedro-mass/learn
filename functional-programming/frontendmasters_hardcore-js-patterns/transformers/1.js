const { TaskT, Task, Either, EitherT, IdT, Id } = require('../lib/types')
const { Left, Right } = Either
const _ = require('lodash')

const TaskEither = TaskT(Either)

const users = [
  { id: 1, name: 'Brian' },
  { id: 2, name: 'Marc' },
  { id: 3, name: 'Odette' },
]
const following = [
  { user_id: 1, follow_id: 3 },
  { user_id: 1, follow_id: 2 },
  { user_id: 2, follow_id: 1 },
]

const find = (table, query) =>
  TaskEither.lift(Either.fromNullable(_.find(table, query)))

// TaskEither.of => Task(Either(Either(x)))
// TaskEither.lift => Task(Either(x))

const app = () =>
  find(users, { id: 1 }) /// Task(Either(User))
    // before TaskEither
    // .chain(u =>
    //   eu.fold(Task.rejected, u => find(following, { follow_id: u.id }))
    // )
    // .chain(eu => eu.fold(Task.rejected, fo => find(users, { id: fo.user_id })))

    // w/TaskEither
    .chain(u => find(following, { follow_id: u.id }))
    .chain(fo => find(users, { id: fo.user_id }))

    .fork(console.error, eu => eu.fold(console.error, console.log))

app()
