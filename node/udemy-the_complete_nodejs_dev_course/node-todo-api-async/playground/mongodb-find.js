// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// can create our own IDs
// let obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db
    .collection('Todos')
    .find({ _id: new ObjectID('598077a472e6d979da9bbf9b') })
    .toArray()
    .then(docs => {
      console.log('Todos');
      console.log(JSON.stringify(docs, undefined, 2));
    })
    .catch(err => {
      console.log('Unable to fetch todos', err);
    });

  // Find pedro users
  db
    .collection('Users')
    .find({ name: 'Pedro' })
    .toArray()
    .then(docs => {
      console.log('Users');
      console.log(JSON.stringify(docs, undefined, 2));
    })
    .catch(err => {
      console.log('Unable to fetch users', err);
    });

  db.close();
});
