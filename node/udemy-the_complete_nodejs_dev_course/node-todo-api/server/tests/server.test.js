const expect = require('expect');
const request = require('supertest');

const app = require('./../server');
const Todo = require('./../models/Todo');

const todos = [
  {
    text: 'first test todo'
  },
  {
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
