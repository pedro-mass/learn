const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const Todo = require('./../../models/Todo');
const User = require('./../../models/User');

const salt = process.env.JWT_SECRET;
const ids = [new ObjectID(), new ObjectID()];
const users = [
  {
    _id: ids[0],
    email: 'pedro@mail.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({ _id: ids[0], access: 'auth' }, salt).toString()
      }
    ]
  },
  {
    _id: ids[1],
    email: 'juan@mail.com',
    password: 'userTwoPass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({ _id: ids[1], access: 'auth' }, salt).toString()
      }
    ]
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'first test todo',
    _creator: users[0]._id
  },
  {
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 33,
    _creator: users[1]._id
  }
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

const populateUsers = done => {
  User.remove({})
    .then(() => {
      let userPromises = [];

      users.forEach(user => {
        userPromises.push(new User(user).save());
      });

      return Promise.all(userPromises);
    })
    .then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };
