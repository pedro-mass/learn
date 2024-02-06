const { ObjectID } = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/Todo');
const User = require('./../server/models/User');

const id = '59851fce9b3f3d040e5d07f4';

// Docs: http://mongoosejs.com/docs/documents.html

// Todo.remove - removes everything matched by the query
// Todo.remove({}).then(commandResult =>
//   console.log('result: ', commandResult.result)
// );

// Todo.findOneAndRemove - finds the first match, removes it, and returns the found result
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5985b773d0decfda1b5426ab')
  .then(todo => console.log('Removed: ', todo))
  .catch(e => console.log('Error removing todo: ', e));
