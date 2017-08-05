const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('./../server');
const Todo = require('./../models/Todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'first test todo'
  },
  {
    _id: new ObjectID(),
    text: 'second test todo'
  }
];

// Doing this creates a common environment for all tests to
// base their assumptions with
beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create a new todo with invalid body data', done => {
    request(app).post('/todos').expect(400).end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find()
        .then(todos => {
          expect(todos.length).toBe(todos.length);
          done();
        })
        .catch(e => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should retrieve all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(todos.length);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return a todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo).toExist();
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should fail on an invalid ID', done => {
    request(app).get('/todos/123').expect(404).end(done);
  });

  it('should fail on a valid ID to a doc that does not exist', done => {
    request(app).get(`/todos/${new ObjectID()}`).expect(404).end(done);
  });
});
