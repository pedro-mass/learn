const cluster = require('cluster');

const workers = Object.values(cluster.workers);

const restartWorker = workerIndex => {
  const worker = workers[workerIndex];
  if (!worker) return;

  worker.on('exit', () => {
    if (!worker.exitedAfterDisconnet) return;
    console.log(`Exited process ${worker.process.pid}`);

    cluster.fork().on('listening', () => {
      restartWorker(workerIndex + 1);
    });
  });

  worker.disconnect();
};

module.exports = restartWorker;
