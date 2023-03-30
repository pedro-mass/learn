// src: https://skilled.dev/course/build-a-javascript-promise

/**
 * limitation
 * - this is an academic version, never use this in production
 *
 * considerations:
 * - then and catch would actually return new Promises
 * - you can have multiple catch blocks
 * - the ordering of catch blocks would matter
 */

class PromiseSimple {
  constructor(fn) {
    this.promiseChain = []
    this.handleError = () => {}

    // since we're going to pass this forward, we need to bind to the current object
    // required b/c these functions are going to be called outside of this object
    this.onReject = this.onReject.bind(this)
    this.onResolve = this.onResolve.bind(this)

    fn(this.onResolve, this.onReject)
  }

  onResolve(value) {
    try {
      this.promiseChain.forEach((fn) => {
        value = fn(value)
      })
    } catch (error) {
      this.promiseChain = []
      this.onReject(error)
    }
  }
  onReject(error) {
    this.handleError(error)
  }

  // Should contain these two functions at minimum
  then(handleSuccess) {
    this.promiseChain.push(handleSuccess)
    // allows this to be chainable
    return this
  }

  // since we're doing simple, assume only called once
  catch(handleError) {
    this.handleError = handleError
    // allow chaining
    return this
  }

  // ...likely will have other helper functions
}

// console.log('test')

fakeApiBackend = () => {
  const user = {
    username: 'treyhuffine',
    favoriteNumber: 42,
    profile: 'https://gitconnected.com/treyhuffine'
  };

  // Introduce a randomizer to simulate the possibility of encountering an error
  if (Math.random() > .05) {
    return {
      data: user,
      statusCode: 200,
    };
  } else {
    const error = {
      statusCode: 404,
      message: 'Could not find user',
      error: 'Not Found',
    };

    return error;
  }
};

// Assume this is your AJAX library.
// Almost all newer ones return a Promise object.
const makeApiCall = () => {
  return new PromiseSimple((resolve, reject) => {
    // Use a timeout to simulate the network delay waiting for the response.
    // This is THE reason you use a promise.
    // It waits for the API to respond, and after received, it executes code in the `then()` blocks in order.
    // If it executed this immediately, there would be no data.
    setTimeout(() => {
      const apiResponse = fakeApiBackend();

      if (apiResponse.statusCode >= 400) {
        reject(apiResponse);
      } else {
        resolve(apiResponse.data);
      }
    }, 1_000);
  });
};

makeApiCall()
  .then((user) => {
    console.log('In the first .then()');

    return user;
  })
  .then((user) => {
    console.log(`User ${user.username}'s favorite number is ${user.favoriteNumber}`);

    return user;
  })
  .then((user) => {
    console.log('The previous .then() told you the favoriteNumber')

    return user.profile;
  })
  .then((profile) => {
    console.log(`The profile URL is ${profile}`);
  })
  .then(() => {
    console.log('This is the last then()');
  })
  .catch((error) => {
    console.log(error.message);
  });