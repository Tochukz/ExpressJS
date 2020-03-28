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
* _csurf_ for Cross-Site Request Forgery
* _express.static_ or _serve-static_
* _connect-timeout_
* _errorhandler_  
* _method-override_  
* _response-time_
* _serve-favicon_  
* _serve-index_  
* _vhost_  
* _connect-busboy_  

to continue from page 62 "express session"  

## Part III: Solving Common and Abstract Problems

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
* Decode the string with `decodeURIComponent()` function using the browser console or NodeJS console.  

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
