const _ = require('lodash');
const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('./../server');
const Todo = require('./../models/Todo');
const User = require('./../models/User');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

// Doing this creates a common environment for all tests to
// base their assumptions with
beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
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
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end((err, res) => {
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
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return a todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todo).toExist();
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should not return a todo doc created by other user', done => {
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should fail on an invalid ID', done => {
    request(app)
      .get('/todos/123')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should fail on a valid ID to a doc that does not exist', done => {
    request(app)
      .get(`/todos/${new ObjectID()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    const id = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todo).toExist();
        expect(res.body.todo.text).toBe(todos[0].text);
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // check the database, looking for the id
        Todo.findById(id)
          .then(todo => {
            expect(todo).toNotExist();
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not delete a todo owner by someone else', done => {
    const id = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // check the database, looking for the id
        Todo.findById(id)
          .then(todo => {
            expect(todo).toExist();
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should fail on an invalid ID', done => {
    request(app)
      .delete('/todos/123')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should fail on a valid ID to a doc that does not exist', done => {
    request(app)
      .delete(`/todos/${new ObjectID()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update a todo', done => {
    const id = todos[0]._id.toHexString();
    const text = 'update from text';

    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(id);
        expect(res.body.todo.text).toBe(text);
      })
      .end(done);
  });

  it('should NOT update a todo owned by someone else', done => {
    const id = todos[0]._id.toHexString();
    const text = 'update from text';

    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({ text })
      .expect(404)
      .end(done);
  });

  it('should complete a todo', done => {
    const id = todos[0]._id.toHexString();
    const completed = true;

    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({ completed })
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(id);
        expect(res.body.todo.completed).toBe(completed);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should un-complete a todo and clear completedAt', done => {
    const id = todos[0]._id.toHexString();
    const completed = false;

    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({ completed })
      .expect(200)
      .expect(res => {
        expect(res.body.todo).toExist();
        expect(res.body.todo._id).toBe(id);
        expect(res.body.todo.completed).toBe(completed);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });

  it('should fail on an invalid ID', done => {
    request(app)
      .patch('/todos/123')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should fail on a valid ID to a doc that does not exist', done => {
    request(app)
      .patch(`/todos/${new ObjectID()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('GET /users/me', () => {
  const path = '/users/me';

  it('should return a user if authenticated', done => {
    request(app)
      .get(path)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', done => {
    request(app)
      .get(path)
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  const path = '/users';

  it('should create a user', done => {
    const userInfo = {
      email: 'unique@mail.com',
      password: 'notMyPass'
    };

    request(app)
      .post(path)
      .send(userInfo)
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(userInfo.email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findOne({ email: userInfo.email })
          .then(user => {
            expect(user).toExist();
            expect(user.password).toNotBe(userInfo.password);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should return validation errors if invalid request', done => {
    request(app).post(path).expect(400).end(done);
  });

  it('should not create user if email in use', done => {
    const userInfo = _.pick(users[0], ['email', 'password']);

    request(app).post(path).send(userInfo).expect(400).end(done);
  });
});

describe('POST /users/login', () => {
  const path = '/users/login';

  it('should be able to login and get user + token', done => {
    const userInfo = _.pick(users[1], ['email', 'password']);

    request(app)
      .post(path)
      .send(userInfo)
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toBe(users[1]._id.toHexString());
        expect(res.body.email).toBe(userInfo.email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user).toExist();
            expect(user.password).toNotBe(userInfo.password);
            expect(user.tokens[1]).toInclude({
              access: 'auth',
              token: res.header['x-auth']
            });
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should fail on email not found', done => {
    const userInfo = { email: 'email@email.com', password: 'password' };

    request(app)
      .post(path)
      .send(userInfo)
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end(done);
  });

  it('should fail on invalid password', done => {
    request(app)
      .post(path)
      .send({
        email: users[1].email,
        password: 'wrongPass'
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens.length).toBe(1);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('DELETE /users/me/token', () => {
  const path = '/users/me/token';

  it('should remove auth token on logout', done => {
    request(app)
      .delete(path)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // make sure the user doesn't have the token anymore
        User.findById(users[0]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should fail on invalid token', done => {
    request(app).delete(path).expect(401).end((err, res) => {
      if (err) {
        return done(err);
      }

      // make sure the user doesn't have the token anymore
      User.findById(users[0]._id)
        .then(user => {
          expect(user.tokens.length).toBe(1);
          done();
        })
        .catch(e => done(e));
    });
  });
});
