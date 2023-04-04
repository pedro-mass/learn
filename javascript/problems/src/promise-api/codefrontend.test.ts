// src: https://codefrontend.com/promises/
import { describe, it, expect } from 'vitest'

enum FuturableState {
  Pending,
  Resolved,
  Rejected,
}

type Resolver<T> = {
  handleThen: (value: T) => void
  handleCatch: (reason?: any) => void
}

const isThenable = (obj: any): obj is Futurable<any> =>
  typeof obj?.then === 'function'

const runAsync = (callback: () => void) => setTimeout(callback, 0)

class Futurable<T> {
  private state = FuturableState.Pending
  private result?: any
  private handlers: Resolver<T>[] = []

  constructor(
    executor: (
      resolve: (value: T | Futurable<T>) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    runAsync(() => {
      try {
        executor(this.resolve, this.reject)
      } catch (e) {
        this.reject(e)
      }
    })
  }

  then = <R1 = T, R2 = never>(
    onFulfilled?: (value: T) => R1 | Futurable<R1>,
    onRejected?: (reason?: any) => R2 | Futurable<R2>
  ) => {
    return new Futurable<R1 | R2>((resolve, reject) => {
      this.handlers.push({
        handleThen: value => {
          if (!onFulfilled) {
            resolve(value as any)
          } else {
            try {
              resolve(onFulfilled(value) as R1 | Futurable<R1 | R2>)
            } catch (e) {
              reject(e)
            }
          }
        },
        handleCatch: reason => {
          if (!onRejected) {
            reject(reason)
          } else {
            try {
              resolve(onRejected(reason) as R1 | Futurable<R1 | R2>)
            } catch (e) {
              reject(e)
            }
          }
        },
      })

      this.executeResolvers()
    })
  }

  catch = <R = never>(onRejected?: (reason?: any) => R | Futurable<R>) =>
    this.then(null, onRejected)

  finally = (onFinally: () => void): Futurable<T> =>
    this.then(
      value => {
        onFinally()
        return value
      },
      reason => {
        onFinally()
        throw reason
      }
    )

  private resolve = (value: T | Futurable<T>) => {
    this.setResult(value, FuturableState.Resolved)
  }

  private reject = (reason?: any) => {
    this.setResult(reason, FuturableState.Rejected)
  }

  /**
   * Handle the transitions, as well as handling inner-promises
   */
  private setResult = (value: any, state: FuturableState) => {
    runAsync(() => {
      if (this.state !== FuturableState.Pending) {
        return
      }

      if (isThenable(value)) {
        value.then(this.resolve, this.reject)
        return
      }

      this.state = state
      this.result = value
      this.executeResolvers()
    })
  }

  private executeResolvers = () => {
    if (this.state === FuturableState.Pending) {
      return
    }

    this.handlers.forEach(resolver => {
      if (this.state === FuturableState.Resolved) {
        resolver.handleThen(this.result)
      } else {
        resolver.handleCatch(this.result)
      }
    })

    this.handlers = []
  }
}

function withDone(testFn) {
  return () => new Promise(done => testFn(done))
}

function dit(label, testFn) {
  return it(label, withDone(testFn))
}

describe('Futurable <constructor>', () => {
  dit(
    `returns a promise-like object,
      that resolves it's chain after invoking <resolve>`,
    done => {
      new Futurable<string>(resolve => {
        setTimeout(() => {
          resolve('testing')
        }, 20)
      }).then(val => {
        expect(val).toBe('testing')
        done()
      })
    }
  )

  dit('is always asynchronous', done => {
    let value = 'no'
    new Futurable<string>(resolve => {
      value = 'yes;'
      resolve(value)
    })
    expect(value).toBe('no')
    done()
  })

  dit('resolves with the returned value', done => {
    new Futurable<string>(resolve => resolve('testing')).then(val => {
      expect(val).toBe('testing')
      done()
    })
  })

  dit('resolves a Futurable before calling <then>', done => {
    new Futurable<string>(resolve =>
      resolve(new Futurable(resolve => resolve('testing')))
    ).then(val => {
      expect(val).toBe('testing')
      done()
    })
  })

  dit('resolves a Futurable before calling <catch>', done => {
    new Futurable<string>(resolve =>
      resolve(new Futurable((_, reject) => reject('fail')))
    ).catch(reason => {
      expect(reason).toBe('fail')
      done()
    })
  })

  dit('catches errors from <reject>', done => {
    const error = new Error('Why u fail?')

    new Futurable((_, reject) => {
      return reject(error)
    }).catch((err: Error) => {
      expect(err).toBe(error)
      done()
    })
  })

  dit('catches errors from <throw>', done => {
    const error = new Error('Why u fail?')

    new Futurable(() => {
      throw error
    }).catch(err => {
      expect(err).toBe(error)
      done()
    })
  })

  dit('does not change state anymore after promise is fulfilled', done => {
    new Futurable((resolve, reject) => {
      resolve('success')
      reject('fail')
    })
      .catch(() => {
        done.fail(new Error('Should not be called'))
      })
      .then(value => {
        expect(value).toBe('success')
        done()
      })
  })

  dit('does not change state anymore after promise is rejected', done => {
    new Futurable((resolve, reject) => {
      reject('fail')
      resolve('success')
    })
      .then(() => {
        done.fail(new Error('Should not be called'))
      })
      .catch(err => {
        expect(err).toBe('fail')
        done()
      })
  })
})

describe('Futurable chaining', () => {
  dit('resolves chained <then>', done => {
    new Futurable<number>(resolve => {
      resolve(0)
    })
      .then(value => value + 1)
      .then(value => value + 1)
      .then(value => value + 1)
      .then(value => {
        expect(value).toBe(3)
        done()
      })
  })

  dit('resolves <then> chain after <catch>', done => {
    new Futurable<number>(() => {
      throw new Error('Why u fail?')
    })
      .catch(() => {
        return 'testing'
      })
      .then(value => {
        expect(value).toBe('testing')
        done()
      })
  })

  dit('catches errors thrown in <then>', done => {
    const error = new Error('Why u fail?')

    new Futurable(resolve => {
      resolve()
    })
      .then(() => {
        throw error
      })
      .catch(err => {
        expect(err).toBe(error)
        done()
      })
  })

  dit('catches errors thrown in <catch>', done => {
    const error = new Error('Final error')

    new Futurable((_, reject) => {
      reject(new Error('Initial error'))
    })
      .catch(() => {
        throw error
      })
      .catch(err => {
        expect(err).toBe(error)
        done()
      })
  })

  dit('short-circuits <then> chain on error', done => {
    const error = new Error('Why u fail?')

    new Futurable(() => {
      throw error
    })
      .then(() => {
        done.fail(new Error('Should not be called'))
      })
      .catch(err => {
        expect(err).toBe(error)
        done()
      })
  })

  dit('passes value through undefined <then>', done => {
    new Futurable(resolve => {
      resolve('testing')
    })
      .then()
      .then(value => {
        expect(value).toBe('testing')
        done()
      })
  })

  dit('passes value through undefined <catch>', done => {
    const error = new Error('Why u fail?')

    new Futurable((_, reject) => {
      reject(error)
    })
      .catch()
      .catch(err => {
        expect(err).toBe(error)
        done()
      })
  })
})

describe('Futurable <finally>', () => {
  dit('it is called when Futurable is resolved', done => {
    new Futurable(resolve => resolve('success')).finally(() => {
      done()
    })
  })

  dit('it is called when Futurable is rejected', done => {
    new Futurable((_, reject) => reject('fail')).finally(() => {
      done()
    })
  })

  dit('it preserves a resolved promise state', done => {
    let finallyCalledTimes = 0

    new Futurable(resolve => resolve('success'))
      .finally(() => {
        finallyCalledTimes += 1
      })
      .then(value => {
        expect(value).toBe('success')
        expect(finallyCalledTimes).toBe(1)
        done()
      })
  })

  dit('it preserves a rejected promise state', done => {
    let finallyCalledTimes = 0

    new Futurable((_, reject) => reject('fail'))
      .finally(() => {
        finallyCalledTimes += 1
      })
      .catch(reason => {
        expect(reason).toBe('fail')
        expect(finallyCalledTimes).toBe(1)
        done()
      })
  })
})

describe('Futurable is thenable', () => {
  dit('is resolves native Promises', done => {
    new Futurable<number>(resolve => resolve(1))
      .then(value => new Promise(resolve => resolve(value + 1)))
      .then(value => {
        expect(value).toBe(2)
        done()
      })
  })

  dit('is can be resolved by native Promises', done => {
    new Promise<number>(resolve => resolve(1))
      .then(value => new Futurable(resolve => resolve(value + 1)))
      .then(value => {
        expect(value).toBe(2)
        done()
      })
  })
})
