const express = require('express');
const responseTime = require('response-time');

const app = express();

app.use(responseTime());

app.get('/', (req, res, next) => {
  res.send('Welcome to Test');
});

app.get('/about', (req, res, next) => {
  res.send("Welcome to the about page")
});

app.get('/contact', (req, res, next) => {
    res.send("Contact us now...")
});

/** This is a computationally intensive route that will block request to other routes from processing. */
app.get('/prime', (req, res, next) => {
    const max = req.query.max || 1000000;
    const primeNumbers = []
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

const port = 9000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));