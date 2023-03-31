/**
 * summary:
 * It was great! They went through a great progression showing how each new feature would get built
 * Broke it down from:
 * - adding async support (like setTimeout)
 * - add chaining
 * - support inner-promises
 *
 * missing:
 * - the instance methods (Promise.all, Promise.race, etc)
 * - does NOT implement .catch()
 * - does not stop going down the chain when first error is hit
 */

/**
 * src:
 * - https://medium.com/swlh/implement-a-simple-promise-in-javascript-20c9705f197a (5mins)
*/

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('zhi-sun')
//   }, 1_000)
// })

// promise.then((res) => {
//   console.log(res);
// }, (err) => {
//   console.log(err);
// });

// promise.catch((err) => {
//   console.log(err);
// });

// promise.finally(() => {
//   console.log("finally over");
// });

/**
 * doesn't handle async, like from setTimeout
 */
class Promise1 {
  constructor(handler) {
    this.status = 'pending'
    this.value = null

    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
      }
    }

    const reject = value => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.value = value
      }
    }

    try {
      handler(resolve, reject);
    } catch(err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
      onFulfilled(this.value)
    } else if (this.status === 'rejected') {
      onRejected(this.value)
    }
  }
}

// // testing code
// const p1 = new Promise1((resolve, reject) => {
//   resolve('resolved')
// })

// const p2 = new Promise1((resolve, reject) => {
//   reject('rejected')
// })

// p1.then(console.log, console.error)
// p2.then(console.log, console.error)

// // Promise1 fails b/c it can't handle this asynchronous code (setTimeout)
// const p3 = new Promise1((resolve, reject) => {
//   setTimeout(() => resolve('timed resolved!'), 1_000)
// })
// p3.then(console.log, console.error)

/**
 * add async (like from setTimeout) support
 */
class Promise2 {
  constructor(handler) {
    this.status = 'pending'
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const ifPending = fn => {
      if (this.isPending) {
        return fn;
      }
    }

    const resolve = ifPending(value => {
        this.status = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn(value))
    })

    const reject = ifPending(value => {
        this.status = 'rejected'
        this.value = value
        this.onRejectedCallbacks.forEach(fn => fn(value))
    })

    try {
      handler(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
      if (this.isPending) {
        this.onFulfilledCallbacks.push(onFulfilled)
        this.onRejectedCallbacks.push(onRejected)
      }

      if (this.isFulfilled) {
        onFulfilled(this.value)
      }

      if (this.isRejected) {
        onRejected(this.value)
      }
  }

  get isPending() {
    return this.status === 'pending'
  }

  get isFulfilled() {
    return this.status === 'fulfilled'
  }

  get isRejected() {
    return this.status === 'rejected'
  }
}

// // testing code
// const p3 = new Promise2(resolve => {
//   setTimeout(() => resolve('promise2: resolved!', 1_000))
// })
// p3.then(console.log, console.error)

/**
 * Now with then-chaining!
 */
class Promise3 {
  constructor(handler) {
    this.status = 'pending'
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const ifPending = fn => {
      if (this.isPending) {
        return fn;
      }
    }

    const resolve = ifPending(value => {
        this.status = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn(value))
    })

    const reject = ifPending(value => {
        this.status = 'rejected'
        this.value = value
        this.onRejectedCallbacks.forEach(fn => fn(value))
    })

    try {
      handler(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    return new Promise3((resolve, reject) => {
      if (this.isPending) {
        this.onFulfilledCallbacks.push(() => {
          try {
            resolve(onFulfilled(this.value))
          }catch (err) {
            reject(err)
          }
        })

        this.onRejectedCallbacks.push(() => {
          try {
            reject(onRejected(this.value))
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.isFulfilled) {
        try {
          resolve(onFulfilled(this.value))
        } catch (err) {
          reject(err)
        }
      }

      if (this.isRejected) {
        try {
          reject(onRejected(this.value))
        } catch (err) {
          reject(err)
        }
      }
    })
  }

  get isPending() {
    return this.status === 'pending'
  }

  get isFulfilled() {
    return this.status === 'fulfilled'
  }

  get isRejected() {
    return this.status === 'rejected'
  }
}

// new Promise3((resolve, reject) => {
//   setTimeout(() => {
//     console.log('timeout reached')
//     resolve('first then')
//   }, 1_000)
// }).then(res => {
//   console.log(res)
//   return 'Second then'
// }).then(console.log, console.error)

/**
 * Now with then that supports inner-promises!
 */
class Promise4 {
  constructor(handler) {
    this.status = 'pending'
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const ifPending = fn => {
      if (this.isPending) {
        return fn;
      }
    }

    const resolve = ifPending(value => {
        this.status = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn(value))
    })

    const reject = ifPending(value => {
        this.status = 'rejected'
        this.value = value
        this.onRejectedCallbacks.forEach(fn => fn(value))
    })

    try {
      handler(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    return new Promise4((resolve, reject) => {
      if (this.isPending) {
        this.onFulfilledCallbacks.push(() => {
          try {
            const fulfilled = onFulfilled(this.value)
            if (isPromise(fulfilled)) {
              fulfilled.then(resolve, reject)
            } else {
              resolve(fulfilled)
            }
          }catch (err) {
            reject(err)
          }
        })

        this.onRejectedCallbacks.push(() => {
          try {
            const rejected = onRejected(this.value)
            if (isPromise(rejected)) {
              rejected.then(resolve, reject)
            } else {
              reject(rejected)
            }
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.isFulfilled) {
        try {
          const fulfilled = onFulfilled(this.value)
          if (isPromise(fulfilled)) {
            fulfilled.then(resolve, reject)
          } else {
            resolve(fulfilled)
          }
        } catch (err) {
          reject(err)
        }
      }

      if (this.isRejected) {
        try {
          const rejected = onRejected(this.value)
          if (isPromise(rejected)) {
            rejected.then(resolve, reject)
          } else {
            reject(rejected)
          }
        } catch (err) {
          reject(err)
        }
      }
    })
  }

  get isPending() {
    return this.status === 'pending'
  }

  get isFulfilled() {
    return this.status === 'fulfilled'
  }

  get isRejected() {
    return this.status === 'rejected'
  }
}

new Promise4((resolve, reject)=> {
  setTimeout(() => {
    console.log('timeout - completed');
    resolve('Promise4')
  }, 1_000)
})
  .then(console.log, console.error)
  .then(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve('resolved second one'), 1000);
    })
  })
  .then(console.log, console.error)

function isPromise(maybePromise) {
  return maybePromise instanceof Promise
}