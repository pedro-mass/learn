const cluster = require('cluster');
const os = require('os');
const restartWorker = require('./restartWorker');

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Master PID: ${process.pid}`);
  console.log(`Forking for ${cpus} CPUs`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  // when a process crashes, restart a new one
  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnet) {
      console.log(`Worker ${worker.id} crashed. ` + 'Starting a new worker...');
      cluster.fork();
    }
  });
} else {
  require('./server');
}

process.on('SIGUSR2', () => {
  restartWorker(0);
});

// BENCHMARK
// use this command: ab -c200 -t10 http://localhost:8080/
// hit the server with 200 concurrent connections for 10 seconds
//
// Concurrency Level:      200
// Time taken for tests:   10.001 seconds
// Complete requests:      1970
// Failed requests:        0
// Total transferred:      193060 bytes
// HTML transferred:       45310 bytes
// Requests per second:    196.98 [#/sec] (mean)
// Time per request:       1015.310 [ms] (mean)
// Time per request:       5.077 [ms] (mean, across all concurrent requests)
// Transfer rate:          18.85 [Kbytes/sec] received
