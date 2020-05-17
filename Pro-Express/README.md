# Pro Express (2014)
__By Azat Mardan__   
[Github Code](https://github.com/azat-co/proexpressjs)  

### Introduction
To get the most benefit from Pro Express.js, you should be familiar with basic Node.js concepts, such as
process and global, and should also know core modules, including stream, cluster, and buffer.  
__Part 4 Github Code__  
* [Instagram Gallery](https://github.com/azat-co/sfy-gallery)
* [Todo App](https://github.com/azat-co/todo-express)
* [REST API](https://github.com/azat-co/rest-api-express)
* [HackHall](https://github.com/azat-co/hackhall)

__Tools/Packages and version__  
* Express.js v4.8.1
* Node.js v0.10.12
* NPM v1.2.32
* MongoDB v2.6.3
* Redis v2.6.7
* Stylus v0.47.3
* Jade v1.5.0
* Foreman v0.75.0
* Google Chrome Version 39.0.2171.7

## Part I: Getting Started

### Chapter 1: Starting with Express.js  
__Tip__ In the advanced stages of your application development (usually leading to deployment into production
environment), you might want to use the _forever module_(https://npmjs.org/package/forever)  and _Upstart_
to accomplish better app uptime. You can also utilize the _cluster module_ as outlined in Chapter 13 to spawn
multiple workers.  

Installing epxress.js module  
`$ npm install express@4.8.1 --save-exact`  

To list all the modules in the project, do:  
`$ npm ls`  

__Express Generator__  
A command-line tool for scaffolding.  
Installing express generator  
`$ npm install -g express-generator`  

### Chapter 2: Hello World Example
__Create express app using express CLI__  
`express --hbs --css sass express-app`  

__run the app__
`$ DEBUG=express-app:* npm start`  

You can rename the directories inside of public directory without having to change any setting. I prefer to name my directories `css`, `img` and `js` instead of the original names `styelsheets`, `images` and `javascripts` respectively.

Tools for watching files changes in NodeJS development included
* `forever`(for use in production server)
* `node-dev`
* `nodemon`
* `supervisor`(from the NPM guys),
* `up`(from the ExpressJS guys).  

## Part II: Deep API Reference

### Chapter 3: Configuration, Settings, and Environments  
Create a new express app  
`express --view=pug --css compass express-setup`  

### Chapter 4: Working with Middleware  
__Monad__  
A pattern in which a function returns one function or another depending on the value of its argument:
```
function (arg) {
  if (arg === 'x') {
    return function() {
      // Do A
    }
  } else {
    return function() {
      // Do B
    }
  }
}

```

The main thing to remember when using middleware is that the order in which middleware functions are
applied with the _app.use()_ function matters, because this is the order in which they’ll be executed.  
A session (express-session) must follow a cookie (cookie-parser), because any web session depends on the cookies for storing the session ID (and it is provided bycookie-parser). Another example is Cross-Site Request Forgery middleware csurf that requires express-session.  
__Essential Middlewares__  
* _compression_ for data compression using this `gzip` or `deflate` strategy.
* _morgan_ for creating access logs
* _body-parser_ for parsing POST request body data
* _cookie-parser_ for creating cookies
* _express-session_ for creating a session (requires cookie-parser before v1.5.0)
* _csurf_ for Cross-Site Request Forgery (requires session or cookie-parser middleware to be initialized first.)
* _express.static_ based on  _serve-static_ serves static files and assets.
* _connect-timeout_ sets a timeout. Recommended for `slow routes` only. Not recommended as a `top-level` middleware. If the request timeout a 503 (service unavailable) will be sent to the client.   
* _errorhandler_  to be used only on development environment. For production add a custom error handler. A custom error handler is NOT a middleware.
* _method-override_ provides support for client that does not support some HTTP methods(e.g PUT, DELETE, OPTIONS) such a browser.  
* _response-time_ adds `X-Response-Time` header to the HTTP responses with the value of time taken to response in ms.
* _serve-favicon_ serves favicons
* _serve-index_ lists files in a directory, require `serve-static`(`express.static`) to display the file when user clicks on it.  
* _vhost_ can control two or more domains and map them to different `app`s based on the domain.
* _connect-busboy_  for file upload.

__CSRF protection using csurf__  
The CSRF protection with the _csurf_ module is handled by Express.JS by putting a *_csrf* token in the session (req.session.\_csrf) and validating that value againt values in the _req.body_, _req.query_ and _X-CSRF-Token_ header. I fhte values don't match, the 403 Forbidden HTTP status code is returned. By default _csurf_ don't check _GET_, _HEAD_ or _OPTIONS_ methods.
_NB_ The validity period of the CSRF token is dictated by the _expires_ or _maxAge_ option property of the _cookie_ or _session_ used.    
If the time period is too short, for example, then you risk having the user's token expire before they finish completing a form and submit the form.
If this happens they will get the 403 error when they submit the form and their token has expired. They may have to refresh their page to start all over a again.
TO avoid this the _maxAge_ of the _cookie_ or _session_ must be significant e.g `{ maxAge: 3*1000*60*60 }` for 3Hours


### Chapter 6: Parameters and Routing  
The Router class acts as a mini Express application.  So you can do `router.use()`,  `router.param()` and `router.VERB()`.

### Chapter 7: Express.js Request Object  
__Caution__ Signing a cookie does not hide or encrypt the cookie. It's a simple way to prevent tempering by applying a private value. Signing (or hashing) is mot the same as encryption. The former is for identification and tampering prevention.  The latter is for hiding the content from unauthorized recipients.

### Chapter 8: Express.js Response Object
Streaming an image shows a shorter waiting time than none-streaming.    
Streaming is useful when dealing with large amount of data (video, binary data, audio, etc) because the streams allow processing to start without finishing transfers.

### Chpater 9: Error Handling and Running an App  
[HTTP Status Codes](https://www.restapitutorial.com/httpstatuscodes.html)    
Use [`errorhandler`](https://www.npmjs.org/package/errorhandler) to handle error in dev environment and implement custom error handler for production environment. See Chapter 4.

## Part III: Solving Common and Abstract Problems

### Chapter 10: Abstraction
Whats the difference between the use of `exports` and `module.exports`  

### Chapter 11: Database, Keys and Stream Tips  
[Rund Node.js as a service](https://kvz.io/run-nodejs-as-a-service-on-ubuntu-karmic.html)


### Chapter 12 Redis and Authentication Patterns
_Redis_ is commonly used to store _express-sessions_. Storing sessions in physical storage keeps apps from losing user's data when a system is restarted or redeployed.  It also enables the use of multiple REST APIs since they can all connect to the same Redis server.  

Redis can also be used for _queues_ and _task scheduling_ such as email jobs.  

__Dependencies__
1. _Redis Server_: A light database server
2. _redis_: A node module that serves as a Redis driver. Used to create Redis client for use in NodeJS app.
3. _conect-redis_: A node module that enables express-session to be stored in Redis store. It connects session store to Redis via the Redis client.  

__Setting up Redis__  
See the gist [Redis getting started](https://gist.github.com/Tochukz/e63cb408a6ce45df76772aee93d48855) to setup Redis on windows.  

__To get the SessionID__
1. From the NodeJS console or
2. From the Client Cookie store(Browser Dev Tool or _PostMan_). This will need to be decoded.    

__To decode a Session ID__
* Get the session ID's string value from the Browser Dev tool or _Post Man_ Cookie store.
* By default the Session ID is stored as a cookie data under the app domain with name that defaults to `connect.sid` if the `key` option is not set.   
It has value of the form `s%3A0E7ag760JMEFnV6dIAggaoCsnwyCaB2P.jgwpKtmx2Cy8KODNnd3AJ1FN%2F1VRrQ6enZ9H8cBbHlI`. This is a URI encoded string.
* Decode the string with `decodeURIComponent()` function using the NodeJS console.  

```
> console.log(decodeURIComponent('s%3A0E7ag760JMEFnV6dIAggaoCsnwyCaB2P.jgwpKtmx2Cy8KODNnd3AJ1FN%2F1VRrQ6enZ9H8cBbHlI'));
```
* You should get the following pattern  
```
s:0E7ag760JMEFnV6dIAggaoCsnwyCaB2P.jgwpKtmx2Cy8KODNnd3AJ1FN/1VRrQ6enZ9H8cBbHlI
```
The substring between `:` and `.` i.e `0E7ag760JMEFnV6dIAggaoCsnwyCaB2P` is the sessionID
* Use `redis-cli` to see the session value in the Redis server store.  

```
> redis-cli
127.0.0.1:6379> get sess:0E7ag760JMEFnV6dIAggaoCsnwyCaB2P
```

This should give you the session value in the format:  
```
{
  "cookie" :{
    "originalMaxAge": 3600000,
    "expires": "2020-03-28T12:53:20.200Z",
    "httpOnly": true,
    "path": "/"
    },
    "counter":8
}"
```  
Here the `cookie` object is meta data and `counter` is the actual value stored in the session.  

__Use the _keys_ command to view all the sessions in the Redis store__  
```
> redis-cli
127.0.0.1:6379> keys sess*  
```


### Chapter 13: Multithreading with Clusters    
With the native _cluster module_, we can effortlessly fork a Node.js process to crete multiple processes. We can spawn as many processes as we have CPUs on that machine.   
[Learn More](https://nodejs.org/api/cluster.html)  

If you prefer ready-made a solution to the low-level library, checkout `cluster2` on [npm](https://www.npmjs.com/package/cluster2) and [Github](https://github.com/ql-io/cluster2)  

### Chapter 14: Applying Stylus, Less, and Sass  
__Process Permissions__  
It is usually a bas idea to run web services as root...  

### Chapter 15: Security Tips
__HTTP Security Headers__   
The Express.js middleware called _helmet_ is a collection of security-related middleware that provide most of the security headers descriped in the [Recx article](http://recxltd.blogspot.com/2012/03/seven-web-server-http-headers-that.html) (Seven Web Server HTTP Headers that Improve Web Application Security for Free).  
See _hemlet_ on [npm](https://www.npmjs.com/package/helmet) and [Github](https://github.com/helmetjs/helmet).   

__Input Validation__  
it is recommended to to write your own module or use _express-validator_.  
See the Docs on [Github](https://express-validator.github.io/docs/)   

With  middleware libraries such as _csurf_, _helmet_ and _express-validator_, we can get a good amount of basic security without adding too many developmen cycles.  

### Chapter 16: Socket.IO and Express.js
Socket.io automatically provides a client library which can be access on the server at `/socket.io/socket.io.js` when you integrate socket.io into your server.   

### Chapter 17: Domain and Express.js
