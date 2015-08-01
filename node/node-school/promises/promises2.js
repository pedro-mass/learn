var q = require('q');
var defer = q.defer();

//defer.promise is the actual promise itself
//defer.promise.then is the "Q" way of attaching a then handler

var printError = function(error) {
	console.log(error.message);
};

// solution
defer.promise.then(null, printError);
setTimeout(defer.reject, 300, new Error("REJECTED!"));
