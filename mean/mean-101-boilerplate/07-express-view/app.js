var 
  cons = require('consolidate'),
  express = require('express'),
  app = express();
  
// assign the ejs engine to .html files
app.engine('html', cons.ejs);
// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/view');


app.get('/', function(req, res) {
 res.render('index', {
 title: 'MEAN'
 });
});

app.listen(8080);