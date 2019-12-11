# Pro Express
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
The main thing to remember when using middleware is that the order in which middleware functions are
applied with the app.use() function matters, because this is the order in which they’ll be executed.  
A session (express-session) must follow a cookie (cookie-parser), because any web session depends on the cookies for storing the session ID (and it is provided bycookie-parser). Another example is Cross-Site Request Forgery middleware csurf that requires express-session.  
__Essential Middlewares__  
* compression: gzips transferred data.
* morgan
* body-parser
* cookie-parser  
* express-session
* csurf
* express.static or serve-static  
* connect-timeout
* errorhandler  
* method-override  
* response-time
* serve-favicon  
* serve-index  
* vhost  
* connect-busboy  
