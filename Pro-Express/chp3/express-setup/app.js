const express = require('express');

const app = express();

/* ExpressJS API for configuration */
// app.set() and app.get()
app.set('user', 'admin');
console.log('User %s', app.get('user')); // admin

// app.enable(), app.disable(), app.enabled() and app.disabled()
console.log(app.enabled('etag')); //true
app.disable('etag');
console.log(app.enabled()); // false

/* Setings  */
/*
 * env gets it's value from process.env.NODE_ENV.
 * If process.env.NODE_ENV is undefined env defaults to development
 * process.env.NODE can be feed into the start of process as written below
 * $  NODE_ENV=production node app.js
 */
const env = app.get('env');
const NODE_ENV = process.env.NODE_ENV;
console.log(env, NODE_ENV); // development undefined
// Restart the app with $ NODE_ENV=production node app.js
console.log(env, NODE_ENV); // production production

// env can be set to development, test, stage, preview, production by convention
// express used development or production.

/* view engine is to define the default template extension to use in res.render()
 * if a file extention is not added to the filename
 */
app.set('view engine', 'ejs');

/* Set trust proxy to true if your Node.js app is working behind a proxy sudh as Varnish or Nginx */
//app.set('trust proxy', true); //or
//app.enable('trust proxy');

/* This is an alternative to using CORS for AJAX request coming from client of a different domain */
app.set('jsonp callback name', 'cb'); // It is recommended to stick to the convention of using 'callback' instead of any other name
// express.js has a res.jsonp() method that makes using JSONP a breeze

/* This will apply the json replacer calback function to all JSON.stringify() funcions in the scope of the application
 * JSON.stingify() is used in res.json() method.
 */
app.set('json replacer', (key, value) => {
  if(key == 'password')
    return undefined;
  else
    return value;
});
// The will apply json 4 spaces of indentation to res.json() string
app.set('json spaces', 4);

// It's best to leave this disabled which is the default
app.enable('case sensitive routing');

//With strict routing enabled /users and /users/ will be different routes as a result of the trailing slash
app.set('strict routing', true);

// It is recommended to turn off 'X-Powered-By' header to make it header to find security vulnerabilities
//app.set('x-powered-by', false); // or
app.disable('x-powered-by')

/* The default value for query string parser is extended, which uses the qs module */
//app.set('query parser', 'simple'); // this uses the querystring module's functionality
//app.set('query parser', false); //Diable parsing
app.set('query parser', (queryString) => {
  // parse the query string
  return {key1: 'value1', key2: 'value2'};
});

/* subdomain offset is set to 2 by default
 * for http://ncbi.nlm.nih.gov req.subdomains will return [nim , ncbi]
 */
app.set('subdomain offset', 3);
// noew req.subdomains wil return [ncbi]

if ('development' === app.get('env')) { //app.get('env') is same as process.env.NODE_ENV || 'development'
  // Connect ot development database
} else if ('production' === app.get('env')) {
  // Connec to production database
}

/* app.configure() has been removed in expressjs 4.x but you may encouter it in older porjets */
// This function will be called in any environment
/*
app.configure(function() {
  app.set('appName', 'Pro ExpressJS App');
  APP.SET('authorEmail', 'Chucks@tochukwu.xyz');
});
//This function will be called only in development environment
app.configure('development', function() {
  app.set('dbURI', 'mongodb://localhost:27017/expressApp' )
});
// This function will be called in production or staging environment
app.configure('production', 'stage', function() {
  app.set('dbURI', process.env.MOGNOHQ_RUL);
});
*/

// Try the jsonp by going to http://localhost:3001/try-jsonp?cb=view
// If we did not change the 'jsonp callback name' we would go to http://localhost:3001/try-jsonp?callback=view
app.get('/try-jsonp', (req, res) => {
  res.jsonp({dev: 'Chuck', lang: 'JavaScrip'});
});

app.get('/try-json', (req, res) => {
  // Because of the 'json replacer' setting above the password will be ommited in the response json string
  // Because of the 'json spaces' settings ablot the json string returned will be formatted with 4 spaces.
  res.json({
    user: 'Tochukz',
    password: 'yxh2jjlg',
    title: "Dev"
  });
});

const port = 3001;
app.listen(port, () => console.log(`Server running @ ${port}`))
