export class PPromise {
  constructor(resolver) {
    this.status = 'pending'
    this.onFulfilledQueue = []
    this.onRejectedQueue = []

    const resolve = this.ifPending(value => {
      this.status = 'fulfilled'
      this.value = value

      const finalVal = this.onFulfilledQueue.reduce((x, onFulfilled) => {
        console.log({
          before: x,
        })
        const after = onFulfilled(x)

        console.log({ after })
        return after
      }, this.value)

      console.log({ finalVal })
    })

    const reject = this.ifPending(value => {
      this.status = 'rejected'
      this.value = value

      this.onRejectedQueue.forEach(onRejected => onRejected(this.value))
    })

    resolver(resolve, reject)
  }

  ifPending(fn) {
    if (this.status === 'pending') {
      return (...args) => fn(...args)
    }
  }

  then(
    onFulfilled = x => x,
    onRejected = x => {
      throw x
    }
  ) {
    if (this.status === 'fulfilled') {
      this.value = onFulfilled(this.value)
    }

    if (this.status === 'rejected') {
      this.value = onRejected(this.value)
    }

    // if we're not ready, add to queue instead
    if (this.status === 'pending') {
      this.onFulfilledQueue.push(onFulfilled)
      this.onRejectedQueue.push(onRejected)
    }

    return this
  }
}
