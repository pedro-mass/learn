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

  // deleteMany
  // db
  //   .collection('Todos')
  //   .deleteMany({ title: 'Eat lunch' })
  //   .then(commandResult => {
  //     console.log('succcess delete: ', commandResult.result);
  //   });

  // deleteOne
  // db
  //   .collection('Todos')
  //   .deleteOne({ title: 'Eat lunch' })
  //   .then(commandResult => {
  //     console.log('succcess delete: ', commandResult.result);
  //   });

  // findOneAndDelete
  db.collection('Todos').findOneAndDelete({ completed: false }).then(result => {
    console.log('succcess delete: ', result);
  });

  db.close();
});
