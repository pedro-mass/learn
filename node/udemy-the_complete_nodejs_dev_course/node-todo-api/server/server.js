require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const mongoose = require('./db/mongoose');
const Todo = require('./models/Todo');
const User = require('./models/User');

const PORT = process.env.PORT;

let app = express();

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(e => res.status(500).send(e));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  // validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // look for the todo
  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.post('/todos', (req, res) => {
  new Todo({
    text: req.body.text
  })
    .save()
    .then(doc => res.send(doc))
    .catch(e => res.status(400).send(e));
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  // validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // look for the todo
  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.listen(PORT, () => {
  console.log('Server started on port: ', PORT);
});

module.exports = app;
