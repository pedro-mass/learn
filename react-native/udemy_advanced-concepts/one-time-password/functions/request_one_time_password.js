const admin = require('firebase-admin');

module.exports = function(req, res) {
  // verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone' });
  }

  // format the phone number to remove dashes and parens
  // note: used the String constructor to handle the case of being passed in
  // a number instead of a string
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  admin.auth().getUser(phone)
    .then(userRecord => {

    });
};
