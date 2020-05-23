const domain = require('domain');

const newDomain = domain.create();
newDomain.on('error', err => {
    console.log('Custom Error:', err.message);
});
/** Error thrown by asynchronous code within a domain will be caught by the error event handler.
 * unlike try-catch which can not catch error thrown by asynchronous code */
newDomain.run(function() {
    setTimeout(() => {
      throw new Error('Fails');
    }, Math.round(Math.random()*100));
});