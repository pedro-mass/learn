const jwt = require('jsonwebtoken');

let data = {
  id: 10
};

const salt = '123abc';

let token = jwt.sign(data, salt);
console.log('token: ', token);

// to view what's in the JWT: https://jwt.io/
let decoded = jwt.verify(token, salt);
console.log('decoded: ', decoded);
