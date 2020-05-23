const domain = require('domain');
const express = require('express');
const errorhandler = require('errorhandler');

const app = express();

if (app.get('env') == 'development') {
    app.use(errorhandler());
}

app.get('/error-domain', (req, res, next) => {
  const dom =  domain.create();

  dom.on('error', err => {
    res.status(500).send({CustomError: err.message});
  });

  dom.run(() => {
    setTimeout(() => {
      throw new Error('A database error occured');
    }, Math.round(Math.random()*1000));    
  });
});

app.get('/error-non-domain', (req, res, next) => {
  setTimeout(() => {
    next(new Error('A DB error occured'));
  }, Math.round(Math.random()*1000));
});

/** The error handler appears to catch error for both domain and non-domain routes */
app.use((err, req, res, next) => {
  // The domain.active will return true for each subsequent request once the domain.create() method has been executed in any previous request.
  if (domain.active) {
     // domain.active.emit('error', err); // This adds a header and if header has already been added in the route an error will be thrown
     res.send(`Domain error: ${err.message}`);
  } else {
      res.send(`Non-domain error: ${err.message}`);
  }
});

const port = 9000;
app.listen(port, () => console.log(`Server running in ${app.get('env')} mode at localhost:${port}`));