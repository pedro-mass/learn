const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('Andrew', 25);
    expect(spy).toHaveBeenCalledWith('Andrew', 25);
  });

  describe('#handleSignup', () => {
    let db = app.__get__('db');
    db.saveUser = expect.createSpy();

    it('should call saveUser with user object', () => {
      var email = 'andrew@example.com';
      var password = '123abc';

      app.handleSignup(email, password);
      expect(db.saveUser).toHaveBeenCalledWith({ email, password });
    });
  });
});
