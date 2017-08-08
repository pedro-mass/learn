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
    .findOneAndUpdate(
      {
        _id: new ObjectID('5981132b6323bcd3d6997bd1')
      },
      {
        $set: {
          completed: true
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(result => {
      console.log('Updated to: ', result);
    });

  db
    .collection('Users')
    .findOneAndUpdate(
      {
        _id: new ObjectID('598078203c8cd67a19c18025')
      },
      {
        $set: {
          name: 'Pedro'
        },
        $inc: {
          age: 1
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(result => {
      console.log('Updated to: ', result);
    });

  db.close();
});
