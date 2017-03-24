var http = require('http'),
fs = require('fs'),
async = require('async'),

host = 'api.brewerydb.com',
options = {
	hostname: host,
	port: 80,
	path: '/v2/',
	method: 'GET',
	headers: {
		Host: host,
    	'Accept': '*/*',
    	'User-Agent': 'node',
    	'Connection': 'keep-alive',
    	'Content-Type': 'application/json',
    	'Content-Length': 0
	}
},

key = '',

request = function(cb) {
	var req;

	options.path = '/v2/locations/?key=' + key + '&region=North%20Carolina';

	req = http.request(options, function(res) {
		var data = '';

		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			data += chunk;

			// console.log('BODY: ' + chunk);
		});

		res.on('end', function () {
			var obj = JSON.parse(data), _req, _obj = [];

			if (!obj || !obj.data) { 
				console.log('Rate limit...'); 
				return cb(); 
			}

			async.each(obj.data, function(item, cb) {
				options.path = '/v2/brewery/' + item.breweryId + '/beers/?key=' + key + '&withBreweries=Y';

				_req = http.request(options, function(res) {
					var _data = '';

					res.setEncoding('utf8')

					res.on('data', function (chunk) {
						_data += chunk;
					});

					res.on('end', function () {
						var __obj = JSON.parse(_data);

						if (__obj.data) _obj = _obj.concat(__obj.data);

						cb();
					});
				});

				_req.on('error', function(e) {
					console.log('Error with request: ' + e.message);
				});

				_req.end();
			}, function() {
				fs.writeFile(__dirname + '/beers.json', JSON.stringify(_obj), cb);
			});
		});
	});

	req.on('error', function(e) {
		console.log('Error with request: ' + e.message);
	});

	req.end();
},

setup = function() {
  	request(function() { console.log('Finished...'); });
}

setup();