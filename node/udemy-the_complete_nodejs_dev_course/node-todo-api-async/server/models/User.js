const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// mongoose validation doc: http://mongoosejs.com/docs/validation.html
// validator library: https://www.npmjs.com/package/validator
// mongoose middleware: http://mongoosejs.com/docs/middleware.html

const salt = process.env.JWT_SECRET;

// Try to make the rounds smaller for tests
// let numberOfRounds = process.env.NUMBER_OF_ROUNDS || 10;
// let numberOfRounds = process.env.NUMBER_OF_ROUNDS;
const numberOfRounds = 5;

// console.log('process.env.NUMBER_OF_ROUNDS: ', process.env.NUMBER_OF_ROUNDS);
// console.log('numberOfRounds: ', numberOfRounds);

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true,
        minlength: 1
      }
    }
  ]
});

// -------- instance methods --------

// Used for when the server sends the JSON version of a user object
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';

  const token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access
      },
      salt
    )
    .toString();

  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    // $pull: pulls out any matched data, and it's object
    $pull: {
      tokens: { token }
    }
  });
};

// -------- Class/static methods --------
UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, salt);
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  // find the user with the email
  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // check if the passwords match
      bcrypt.compare(password.toString(), user.password, (err, result) => {
        if (err || !result) {
          return reject();
        }

        resolve(user);
      });
    });
  });
};

// -------- middleware --------
UserSchema.pre('save', function(next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(numberOfRounds, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
