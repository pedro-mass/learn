const http = require('http');
const pid = process.pid;

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++); // simulate CPU work
    res.end(`Handled by proces ${pid}`);
  })
  .listen(8080, () => {
    console.log(`Started process ${pid}`);
  });

// simulate a server crash
setTimeout(() => {
  process.exit(1); // death by random timeout
}, Math.random() * 10000);

// BENCHMARK
// use this command: ab -c200 -t10 http://localhost:8080/
// hit the server with 200 concurrent connections for 10 seconds
//
// Concurrency Level:      200
// Time taken for tests:   10.008 seconds
// Complete requests:      635
// Failed requests:        0
// Total transferred:      62230 bytes
// HTML transferred:       14605 bytes
// Requests per second:    63.45 [#/sec] (mean)
// Time per request:       3152.194 [ms] (mean)
// Time per request:       15.761 [ms] (mean, across all concurrent requests)
// Transfer rate:          6.07 [Kbytes/sec] received
