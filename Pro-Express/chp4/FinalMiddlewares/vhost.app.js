const express = require('express');
const vhost = require('vhost');

const main = express();
const server= express();
const api = express();



/*** Routes **/
/* Server Routes */
server.get('/home', (req, res) => {
  res.send(`Welcome to server ${req.url}`);
});

/* API Routes */
api.get('/home', (req, res) => {
  res.send(`Welcome to API ${req.url}`);
});

main.get('/', (req, res) => {
  res.send('Welcome to Main site');
});
main.use(vhost('*.vhost.test', api));
main.use(vhost('vsite.test', server));

main.listen(9000, () => console.log(`2 Servers running on port ${9000}`));