// Get the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');  // used to create, sign, and verify tokens
var config = require('./config');
var User = require('./app/models/user');

// CONFIGURATION
var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

// use body parser so we can get infor from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// ROUTES

//basic route
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', function(req, res) {
  // create a sample user
  var nick = new User({
    name: 'Nick Cerminara',
    password: 'password',
    admin: true
  });

  // save the sample user
  nick.save(function(err) {
    if (err) { throw err; }

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// API ROUTES

// get an instance of the router for api ROUTES
var apiRoutes = express.Router();

// route to authenticate a user
apiRoutes.post('/authenticate', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) { throw err; }

    if (!user) {
      res.json({
        success: false,
        message: 'Auth failed. User not found.' });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Auth failed. Wrong password.'
        });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440  // expires in 24 hours
        });

        // return the info including token as json
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        })
      }
    }
  });
});


// route middleware to verify a token
function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks expires
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

// route to show a random message
apiRoutes.get('/', verifyToken, function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users
apiRoutes.get('/users', verifyToken, function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);


// START THE SERVER
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
