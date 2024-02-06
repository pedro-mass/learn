const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res) {
  // verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone' });
  }

  // format the phone number to remove dashes and parens
  // note: used the String constructor to handle the case of being passed in
  // a number instead of a string
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  admin
    .auth()
    .getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      // text the user
      twilio.messages.create(
        {
          body: 'Your code is ' + code,
          to: phone,
          from: '+15853765124'
        },
        err => {
          if (err) {
            return res.status(422).send(err);
          }

          admin
            .database()
            .ref('users/' + phone)
            .update({ code: code, codeValid: true }, () => {
              res.send({ success: true });
            });
        }
      );
    })
    .catch(err => {
      // for production
      // res.status(422).send({ error: 'User not found' });
      // for debugging
      res.status(422).send({ error: err });
    });
};
