const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const Todo = require('./models/Todo');
const User = require('./models/User');

const PORT = process.env.PORT || 3000;

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  new Todo({
    text: req.body.text
  })
    .save()
    .then(doc => res.send(doc))
    .catch(e => res.status(400).send(e));
});

app.listen(PORT, () => {
  console.log('Server started on port: ', PORT);
});

module.exports = app;
