// server.js

// BASE SETUP
// ====================================

// calll the packages we need
var express = require('express');
var app = express();	// define our app using express
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/dev-learn'); // connect to our database

var Bear = require('./app/models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POSt
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// ====================================
var router = express.Router();		// get an instance of the express router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();	// make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'horray! welcome to our api!' });
})

// more routes for our API will happen here

// on routes that end in /bears
// --------------------------------------
router.route('/bears')
	.post(function(req, res) {
		var bear = new Bear();	// create a new instance of the Bear model
		bear.name = req.body.name;	// set the bears name

		// save the bear and check for errors
		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});
	})
	// get all the bears
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		})
	});

// on routes that end in /bears/:bear_id
// -----------------------------------------
router.route('/bears/:bear_id')
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);

			res.json(bear);
		});
	})
	// update the bear with this id
	.put(function(req, res) {
		// use our bear model to find the bear we want
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);

			bear.name = req.body.name;	// update the bears info

			// save the bear
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});
		});
	})
	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	})
;


// REGISTER OUR ROUTE ---------------------------
// all of our route will be prefixed with /api
app.use('/api', router);

// START THE server
// ====================================
app.listen(port);
console.log('Magic happens on port ' + port);
