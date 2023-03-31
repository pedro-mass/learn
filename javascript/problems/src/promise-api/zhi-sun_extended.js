// src: https://zhisun.medium.com/implementing-promise-all-promise-race-promise-resolve-and-promise-reject-in-javascript-ddc624065554

function isPromise(maybePromise) {
  return maybePromise instanceof Promise
}

class PedroPromise {
  constructor(handler) {
    this.status = 'pending'
    this.value = null

    // queues
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const ifPending = (fn => {
      if (this.isPending) {
        return fn
      }
    })

    const resolve = ifPending(value => {
      this.status = 'fulfilled'
      this.value = value

      // process queues
      this.onFulfilledCallbacks.forEach(fn => fn(value))
    })

    const reject = ifPending(value => {
      this.status = 'rejected'
      this.value = value

      // process queues
      this.onRejectedCallbacks.forEach(fn => fn(value))
    })

    try {
      handler(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected = (x) => { throw x }) {
    return new PedroPromise((resolve, reject) => {
      // resolve
      const handleFulfill = () => {
        try {
          const fulfilled = onFulfilled(this.value)
          if (isPromise(fulfilled)) {
            fulfilled.then(resolve, reject)
          } else {
            resolve(fulfilled)
          }
        } catch (error) {
          reject(error)
        }
      }
      if (this.isFulfilled) {
        handleFulfill()
      }

      // reject immediately
      const handleReject = () => {
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
      if (this.isRejected) {
        handleReject();
      }

      // queues
      if (this.isPending) {
        this.onFulfilledCallbacks.push(handleFulfill)
        this.onRejectedCallbacks.push(handleReject)
      }
    })
  }

  // catch(onRejected) {
  //   if (this.status === 'rejected') {
  //     onRejected(this.value)
  //   }
  // }

  get isPending() {
    return this.status === 'pending';
  }

  get isFulfilled() {
    return this.status === 'fulfilled'
  }

  get isRejected() {
    return this.status === 'rejected'
  }

  static resolve (value) {
    if (isPromise(value)) {
      return value
    } else {
      return new Promise(resolve => resolve(value))
    }
  }

  static reject (reason) {
    return new Promise((resolve, reject) => reject(reason))
  }

  static all (promises) {
    return new Promise((resolve, reject) => {
      let counter = 0
      const result = []

      for (let i = 0; i < promises.length; i++) {
        // Promise.resolve: guarantee we have a promise
        Promise.resolve(promises[i])
          .then(
            res => {
              result[i] = res
              counter += 1

              // this check need to be here, otherwise counter would remain 0 till forloop is done
              if (counter === promises.length) {
                resolve(result)
              }
            },
            reject
          )
      }
    })
  }
}

// const p1 = new PedroPromise((resolve) => resolve(3))
// const p2 = 42
// const p3 = new PedroPromise((resolve) => setTimeout(resolve, 100, 'foo'))
// PedroPromise.all([p1, p2, p3]).then(console.log)

PedroPromise.race = function(promises) {
  return new PedroPromise((resolve, reject) => {
    for (let p of promises) {
      Promise.resolve(p).then(resolve, reject)
    }
  })
}

const r1 = new PedroPromise((resolve) => setTimeout(resolve, 500, 'one'))
const r2 = new PedroPromise((resolve) => setTimeout(resolve, 100, 'two'))
PedroPromise.race([r1, r2]).then(res => console.log({ msg: 'PedroPromise.race', res}))
Promise.race([r1, r2]).then(res => console.log({ msg: 'normal Promise.race', res}))