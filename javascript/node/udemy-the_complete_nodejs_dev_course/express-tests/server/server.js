const express = require('express');

let app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/error', (req, res) => {
  res.status(404).send({
    error: 'page not found',
    name: 'Todo App v1.0'
  });
});

app.get('/users', (req, res) => {
  res.send([
    { name: 'pedro', age: 28 },
    { name: 'crystal', age: 27 },
    { name: 'andrew', age: 25 }
  ]);
});

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});

// useful for testing
module.exports.app = app;
