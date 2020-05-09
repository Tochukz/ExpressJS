var express= require('express'),
app = express(),
post = express(),
comment = express();

// The post app is mounted on the '/post' path of the parent(app)
app.use('/post', post); 
// The comment app is mounted on the '/comment' path pf the parent(post)
post.use('/comment', comment);  

// Where is each app mounted
console.log(app.mountpath); // ''
console.log(post.mountpath); // '/post'
console.log(comment.mountpath); // '/comment'

// What is each app's path
console.log(app.path()); // ''
console.log(post.path()); // '/post'
console.log(comment.path()); // '/post/comment'