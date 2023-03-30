/**
 * Summary:
 *
 * Implements Promises in a FunctionalProgramming way.
 * It's very confusing to follow
 */

// src:
// - https://dev.to/cleancodestudio/this-is-how-javascript-promises-really-work-a-promising-guide-dlg
// - https://dev.to/cleancodestudio/this-is-how-to-implement-javascript-promises-from-scratch-357k

class CPromise {
  constructor(executionFunction) {
    this.executionFunction = executionFunction
  }

  map (mapper) {
    return new CPromise((resolve, reject) => this.executionFunction(
      x => resolve(mapper(x)),
      reject
    ))
  }

  flatMap(mapper) {
    return new CPromise(
      (resolve, reject) => this.executionFunction(
         x => mapper(x).executionFunction(resolve, reject),
         reject
      )
    )
  }
}

new CPromise((resolve, reject) => {
  resolve('success')
  // reject('fail')
}).executionFunction(console.log)