var
  express = require('express'),
  mongoose = require('mongoose'),
  app = express();

mongoose.connect('mongodb://localhost/mean');

var Beer = mongoose.model('Beer', { name: String });

// route static files
app.use(express.static(__dirname + '/public'));

// create route for beer list
app.get('/beers', function(req, res, next) {
	Beer.find({ styleId: 31}).exec(function(err, beers) {
		if (err) return next(err);
		res.json(beers);
	});
});

// create route for beer get
app.get('/beers/:id', function(req, res, next) {
	Beer.findOne({ _id: req.params.id }).exec(function(err, beer) {
		if (err) return next(err);
		res.json(beer);
	});
});

app.listen(process.env.PORT || 8080);

console.log('App running on port ' + (process.env.PORT || 8080) + '...');
