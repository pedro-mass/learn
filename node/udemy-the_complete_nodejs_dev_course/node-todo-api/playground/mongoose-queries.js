const { ObjectID } = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/Todo');
const User = require('./../server/models/User');

const id = '59851fce9b3f3d040e5d07f4';

// Docs: http://mongoosejs.com/docs/queries.html

// // find
// Todo.find({ _id: id }).then(todos => console.log('Todos: ', todos));
//
// // findOne
// Todo.findOne({ _id: id }).then(todo => console.log('Todo: ', todo));
//
// // findById
// Todo.findById(id).then(todo => console.log('Todo By Id: ', todo));

// Challenge: FindUser
User.findById('5983da029d8813fc3c20053b')
  .then(user => {
    if (!user) {
      return console.log('User not found for id');
    }

    console.log('User by Id', user);
  })
  .catch(e => console.log(e));
