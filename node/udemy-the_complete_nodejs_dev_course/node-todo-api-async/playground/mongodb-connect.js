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

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  //
  // db.collection('Users').insertOne({
  //   name: 'Pedro',
  //   age: 27,
  //   location: 'somewhere'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //
  //   console.log(result.ops[0]._id.getTimestamp()); // 2017-08-01T12:53:23.000Z
  //   console.log(`Created on ${result.ops[0]._id.getTimestamp()}`); // Created on Tue Aug 01 2017 08:53:23 GMT-0400 (EDT)
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
});
