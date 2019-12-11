const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'jade');

app.set('port', process.env.PORT || 3001);

app.use(bodyParser.json());

const server = http.createServer(app);
const boot = function() {
  server.listen(app.get('port'), () => console.log(`Server running on localhost:${app.get('port')}`));
}
const shutdown = function() {
  server.close();
}

/*
 If it's true, then this file wasn't included by anything else.
 i.e it is the entry point or the main file.
*/
if (require.main === module) {
  boot();
} else {
  console.info('Running app as a mudule');
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}
