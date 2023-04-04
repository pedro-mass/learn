import { describe, expect, it } from 'vitest'

const STATES = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
}

function makeAsync(fn) {
  return (...args) => setTimeout(fn, 0, ...args)
}

function isThenable(thing) {
  return typeof thing?.then === 'function'
}

class Thenable {
  constructor(executor) {
    this.state = STATES.pending
    this.value = undefined

    this.handlers = []

    // this.resolve = this.resolve.bind(this)
    // this.reject = this.reject.bind(this)

    makeAsync(() => {
      try {
        executor(this.resolve, this.reject)
      } catch (error) {
        this.reject(error)
      }
    })()
  }

  resolve = value => {
    this.setValue(value, STATES.fulfilled)
  }
  reject = reason => {
    this.setValue(reason, STATES.rejected)
  }

  setValue = makeAsync((value, state) => {
    if (this.state !== STATES.pending) {
      return
    }
    if (isThenable(value)) {
      value.then(this.resolve, this.reject)
      return
    }

    this.value = value
    this.state = state

    this.runHandlers()
  })

  then = (
    onFulfilled = x => x,
    onRejected = x => {
      throw x
    }
  ) => {
    return new Thenable((resolve, reject) => {
      const rejectOnError = fn => {
        try {
          resolve(fn())
        } catch (err) {
          reject(err)
        }
      }

      this.handlers.push({
        handleThen: value => rejectOnError(() => onFulfilled(value)),
        handleCatch: reason => rejectOnError(() => onRejected(reason)),
      })

      this.runHandlers()
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    return this.then(
      value => {
        onFinally()
        return value
      },
      reason => {
        onFinally()
        throw reason
      }
    )
  }

  runHandlers = () => {
    if (this.state === STATES.pending) {
      return
    }

    this.handlers.forEach(handler => {
      if (this.state === STATES.fulfilled) {
        handler.handleThen(this.value)
      } else {
        handler.handleCatch(this.value)
      }
    })

    this.handlers = []
  }

  debug(extras = {}) {
    console.log({
      instance: this,
      ...extras,
    })
  }
}

describe('Thenable', () => {
  describe('.then', () => {
    it('should unblock the main thread', () => {
      let called = false
      new Thenable(resolve => {
        called = true
        resolve()
      })

      expect(called).toEqual(false)
    })
    it('should be thenable-resolve', () =>
      new Thenable(resolve => resolve('success')).then(res => {
        expect(res).toEqual('success')
      }))
    it('should be thenable-reject', () =>
      new Thenable((_resolve, reject) => reject('failure')).then(
        undefined,
        err => {
          expect(err).toEqual('failure')
        }
      ))
    it('should support an async call', () =>
      new Thenable(resolve => setTimeout(resolve, 0, 'success')).then(res => {
        expect(res).toEqual('success')
      }))
    it('should allow chaining', () =>
      new Thenable(resolve => resolve(1))
        .then(res => ++res)
        .then(res => expect(res).toEqual(2)))
    it('handles promises', () =>
      new Thenable(resolve => resolve('promise-success'))
        .then(res => {
          expect(res).toEqual('promise-success')

          return Promise.resolve('new-promise-success')
        })
        .then(res => expect(res).toEqual('new-promise-success')))
  })
  describe('.catch', () => {
    it('handles errors', () =>
      new Thenable((resolve, reject) => reject('fail')).catch(err =>
        expect(err).toEqual('fail')
      ))
    it('is skipped if NO ERRORS are found', () => {
      let skipped = true
      return new Thenable((resolve, _reject) => resolve('skip'))
        .catch(err => {
          expect(err).toBeUndefined()
          skipped = false
        })
        .then(res => {
          expect(skipped).toEqual(true)
          expect(res).toEqual('skip')
        })
    })
  })
  describe('.finally', () => {
    it('runs after all promises are settled (success)', () =>
      new Thenable(resolve => resolve('success'))
        .then(res => expect(res).toEqual('success'))
        .finally(() => expect(true).toEqual(true)))
    it.only('runs after all promises are settled (fail)', async () => {
      let ranFinally = false

      await new Thenable((_resolve, reject) => reject('fail'))
        .catch(err => expect(err).toEqual('fail'))
        .finally(() => {
          ranFinally = true
          expect(true).toBe(true)
        })
      expect(ranFinally).toEqual(true)
    })
  })
})
