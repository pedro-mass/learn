const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// let newTodo = new Todo({
//   text: 'Cook dinner'
// });

// newTodo
//   .save()
//   .then(doc => {
//     console.log('Saved todo', doc);
//   })
//   .catch(err => console.log(err));

new Todo({
  text: 'Clean up from dinner',
  completed: true,
  completedAt: Date.now()
})
  .save()
  .then(doc => console.log('Saved todo', doc))
  .catch(err => console.log(err));
