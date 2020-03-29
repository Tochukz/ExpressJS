const express = require('express');
const path = require('path');

const app = express();

/*** Middlewares **/
/* using built-in express static middleware */
app.use(express.static(path.join(__dirname, 'public')));

/* mount express static middleware on a path */
app.use('/scores', express.static(path.join(__dirname, 'music')));

/* basic logger middleware */
app.use((req, res, next) => {
  console.log("Root %s %s", (new Date).toString(), req.method);
  return next();
});

/* Mount middleware for route with /admin url prefix*/
app.use('/admin', (req, res, next) => {
  console.log('Admin %s %s', (new Date).toJSON(), req.url);
  return next();
});





/*** Routes **/
app.get('/', (req, res) => {
  res.send('Welcome to Middleware Chapter');
});

app.get('/admin/user', (req, res) => {
  res.send('Welcome to admin page');
})

const port = 9000;
const server = app.listen(port, () => console.info(`Server running on ${server.address().port}`));
