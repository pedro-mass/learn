const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {
  describe('GET /', () => {
    it('should return hello world response', done => {
      request(app).get('/').expect(200).expect('Hello World!').end(done);
    });
  });

  describe('GET /error', () => {
    it('should handler error page', done => {
      request(app)
        .get('/error')
        .expect(404)
        .expect(res => {
          expect(res.body).toInclude({
            error: 'page not found'
          });
        })
        .end(done);
    });
  });

  describe('GET /users', () => {
    it('should be able fetch users', done => {
      request(app)
        .get('/users')
        .expect(200)
        .expect(res => {
          expect(res.body).toInclude({ name: 'pedro', age: 28 });
        })
        .end(done);
    });
  });
});
