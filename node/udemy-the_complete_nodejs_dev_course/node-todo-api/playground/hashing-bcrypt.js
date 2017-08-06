const bcrypt = require('bcryptjs');
// docs: https://www.npmjs.com/package/bcryptjs

const password = 'password';

// bcrypt.genSalt(10, (err, salt) => {
//   const hash = bcrypt.hash(password, salt, (err, hash) => {
//     console.log('hash: ', hash);
//   });
// });

let hashedPassword =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTg3MTkxMDA4MGU5NDU4ZDUxZWQwM2MiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTAyMDI2MDAwfQ.YRdJZD047jAls0Celr7jYNg1ekg3Dd8sqSTo3GNKAWU';

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
});
