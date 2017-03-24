// Lesson 3 - My First I/O

if (process.argv.length == 3) {
	var fileName = process.argv[2];

	var fs = require('fs');

	var str = fs.readFileSync(fileName).toString();

	var count = str.split('\n').length - 1;

	console.log(count);
}
