const admin = require('firebase-admin');

module.exports = function(req, res) {
  // verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  // format the phone number to remove dashes and parens
  // note: used the String constructor to handle the case of being passed in
  // a number instead of a string
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  // create new user account using the phone
  admin
    .auth()
    .createUser({ uid: phone })
    // respond to the user request, saying the account was made
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));
};
