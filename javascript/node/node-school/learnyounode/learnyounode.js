// Lesson 1 - hello world
// console.log('HELLO WORLD');

// Lesson 2 - command line args
var sum = 0;
for(i=2; i<process.argv.length; i++) {
	sum += Number(process.argv[i]);
}

console.log(sum);
