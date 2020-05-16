const cluster = require('cluster');
const http = require('http');
const os = require('os');

const express = require('express');

const numOfCPUs = os.cpus().length;
if (cluster.isMaster) {
  console.log('Fork %s worker(s) from master', numOfCPUs);
  for (let i = 0; i < numOfCPUs; i++) {
      cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log('Worker is running on %d pid', worker.process.pid);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker with %d is closed', worker.process.pid);
  });
} else if (cluster.isWorker) {
    const port = 9000;
    console.log('Worker (%d) is now listening to http://localhost:%d', cluster.worker.process.pid, port);

    const express = require('express');
    const responseTime = require('response-time');

    const app = express();

    app.use(responseTime());

    app.use((req, res, next) => {
        req.pid = cluster.worker.process.pid;
        return next();
    });

    app.get('/', (req, res, next) => {
        res.send(`<p>Welcome to Test</p> <pre>Process ID: ${req.pid}</pre>`);
    });

    app.get('/about', (req, res, next) => {
        res.send(`<p>Welcome to the about page</p> <pre>Process ID: ${req.pid}</pre>`)
    });

    app.get('/contact', (req, res, next) => {
        res.send(`<p>Contact us now...</p> <pre>Process ID: ${req.pid}</pre>`)
    });

    /** This is a computationally intensive route that could have blocked request if not for the use of clusters */
    app.get('/prime', (req, res, next) => {
        const max = req.query.max || 1000000;
        const primeNumbers = [`Process ID: ${req.pid}`]
        const allPrimes =  function findHighestPrime(max) {
            let n = 1;
            search: while(n < max) {
                n++;
                for(let i = 2; i <= n ; i++) {
                    if (n !== i && n % i === 0) {
                    continue search;
                    }
                }
                primeNumbers.push(n);
            }
        }
        const p = allPrimes(max);
        res.send(primeNumbers);
    });

    app.listen(port, () => console.log(`Server is listening on port ${port}`));

}