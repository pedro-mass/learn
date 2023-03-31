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
}

// new PedroPromise((resolve, reject) => {
//   resolve('1st promise')
// })
//   .then(console.log, console.error)

// new PedroPromise((resolve, reject) => {
//   reject('failed')
// })
// .catch(console.error)
// .then(console.log, console.error)

const handleError = (label = 'error hit') => (error) => console.error({ label, error})

new PedroPromise((resolve) => {
  setTimeout(() => resolve('setTimeout: 1st'), 1_000)
})
  .then(console.log, handleError())
  .then(() => 'second then')
  .then(console.log, handleError())
  .then(() => {
    throw new Error('first failure')
  })
  // .catch(handleError('catch'))
  .then(console.log, handleError('catch does NOT work/exist'))
  // .catch(err => {
    //   console.error({
      //     msg: 'first catch',
      //     err
      //   })
      // })
  // .then(() => 'past then with onRejected')
  // .then(console.log, handleError())
