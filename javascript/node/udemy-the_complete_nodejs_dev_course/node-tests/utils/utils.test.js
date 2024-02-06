const expect = require('expect');

const utils = require('./utils');

it('should add two numbers', () => {
  let result = utils.add(33, 11);

  expect(result).toBe(44).toBeA('number');
});

it('should async add two numbers', done => {
  utils.asyncAdd(33, 11, sum => {
    expect(sum).toBe(44).toBeA('number');
    done();
  });
});

it('should be able to square a number', () => {
  let result = utils.square(11);

  expect(result).toBe(121).toBeA('number');
});

it('should async square a number', done => {
  utils.asyncSquare(11, result => {
    expect(result).toBe(121).toBeA('number');
    done();
  });
});

it('should expect some values', () => {
  expect(12).toNotBe(13);
  expect({ name: 'Pedro' }).toEqual({ name: 'Pedro' });
  expect([2, 3, 4]).toInclude(4);

  // apply to objects
  expect({
    name: 'pedro',
    age: 27,
    location: 'somewhere'
  }).toInclude({
    age: 27
  });
});

it('should set first and last name', () => {
  let user = {
    age: 27,
    location: 'somewhere'
  };
  utils.setName(user, 'Pedro Mass');

  expect(user)
    .toInclude({
      firstName: 'Pedro',
      lastName: 'Mass'
    })
    .toBeA('object');
});
