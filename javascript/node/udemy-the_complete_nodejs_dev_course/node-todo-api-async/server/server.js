require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const mongoose = require('./db/mongoose');
const Todo = require('./models/Todo');
const User = require('./models/User');
const authenticate = require('./middleware/authenticate');

const PORT = process.env.PORT;

let app = express();

app.use(bodyParser.json());

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  })
    .then(todos => {
      res.send({ todos });
    })
    .catch(e => res.status(500).send(e));
});

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  // validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // look for the todo
  Todo.findOne({ _id: id, _creator: req.user._id })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.post('/todos', authenticate, (req, res) => {
  new Todo({
    text: req.body.text,
    _creator: req.user._id
  })
    .save()
    .then(doc => res.send(doc))
    .catch(e => res.status(400).send(e));
});

app.delete('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  // validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // look for the todo
  try {
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });
    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo });
  } catch (e) {
    res.status(400).send();
  }
});

// Users
app.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log('Server started on port: ', PORT);
});

module.exports = app;
