const {
  Fn,
  FnT,
  TaskT,
  Task,
  Either,
  EitherT,
  Id,
  IdT,
} = require('../lib/types')

const FnTask = FnT(Task)
const App = EitherT(FnTask) // App :: Either(Fn(Task))

// const res = App.of(2).map(x => x + 1)
// res.fold(console.error, fn =>
//   fn.run({ myEnv: true }).fork(console.error, console.log)
// )

App.of(2)
  .chain(two => App.lift(EitherId.of(two + two)))
  .chain(four => App.lift(EitherId.lift(Id.of(four)))) // App(Task(Either))
  // .map(four => four + 1)
  .chain(four => App.lift(Task.of(four).map(Either.of)))
  .run()
  .fold(console.error, fx => console.log(fx.extract()))
