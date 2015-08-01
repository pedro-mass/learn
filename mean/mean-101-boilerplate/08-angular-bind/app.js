// Code something awesome...
var 
  cons = require('consolidate'),
  express = require('express'),
  app = express();

// route static files
app.use(express.static(__dirname + '/public'));

// assign the ejs engine to .html files
app.engine('html', cons.ejs);
// set .html as the default extension 
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// create route for root path
app.get('/', function(req, res) {
  res.render('index', {
    title: 'MEAN'
  });
});

app.listen(process.env.PORT || 8080);

console.log('App running on port ' + (process.env.PORT || 8080) + '...');