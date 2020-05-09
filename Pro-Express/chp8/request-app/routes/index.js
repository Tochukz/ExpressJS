const path = require('path');
const fs = require('fs');
var express = require('express');
var router = express.Router();

/* middleware */
router.use((req, res, next) => {
  res.locals = { title: 'Using res.locals set by middleware' };
  return next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/** Using the callback argument of the res.render() object 
 * res.render() also have an overload version that takes the callback as the second argument.
 */
router.get('/callback', (req, res) => {
  res.render('callback', {title: 'Trying the callback'}, (error, html ) => {
    if (error) {
      console.error("\x1b[31m", error);
    } else {
      console.log("\x1b[32m", html);
    }
    return res.send(html);
  });
});

/** Use res.locals to pass data to the template */
router.get('/locals', (req, res) => {
  res.locals = { title: 'Using res.locals'}
  res.render('locals');
});

/** res.locals may be uses to pass data by say a middleware and will be accessable to a template rendered by any other request handler */
router.get('/locals-2', (req, res) => {
  // res.locals has been set by the middleware above
  res.render('locals');
});

/** using res.set() to set response header */
router.get('/xml-page', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.end(
    `<user>
      <name>Tochukz</name>
      <email>tochukz@gmail.com</email>
      <city>Cape Town</city>
    </user>`
  );
  // res.send() automatically adds content-type and other headers but res.end() doesn't
});

/** set multiple headers using res.set() */
router.get('/csv-page', (req, res) => {
  const body = ` Langs, Pro \n C#, 6 \n PHP, 8 \n JavaScript, 8 \n`; 
  res.set({'Content-Type': 'text/csv', 'Content-Length': body.length, 'Set-Cookie': ['type=reader', 'language=javascript']});
  res.end(body);
});

/** use res.status() with status code argument */
router.get('/status', (req, res) => {
  res.status(202).end();
});

/** res.send() can be used a different ways */
router.get('/many-ways', (req, res) => {
  /* send contet-type of text/html */
  // res.send('<h3>Using res.send</h3>');
  
  /* send content-type of application/json */
  // res.send({name: 'Tochukwu', networth: 'R1 Million'});
  // res.send([{lang: 'Javascript'}, {lang: 'C#', lang: 'PHP'}]);

   /* send content-type of application/octet-stream */
   res.send(new Buffer('Express.js is so cool'));

});

/** chain send() res.status() to   */
router.get('/server-error', (req, res) => {
  res.status(500).send({message: 'Oops! A server error occured'});
});

/** Override the default content-type of res.send() using res.set() */
router.get('/buffer-page', (req, res) => {
  /* This is override the application/octet-stream content-type which res.send() would have used for the Buffer type */
  res.set('Content-Type', 'text/plain');
  res.send(new Buffer('Express.js is so cool'));
});

/** res.json() is similar to passing a JSON object to res.send() */
router.get('/json-page', (req, res) => {
  res.json([{name: 'Chucks', who: 'Dev'}, {name: 'Chucks', who: 'Painist'}, {name: 'Chucks', who: 'Millionaire'}]);
});
/* res.json() authomatically does JSON.stringify() on it's argument and you can prepend res.status() to is */

/** JSONP is JSON wrapped in a javascript function. 
 * If the user does NOT appends a 'callback' value as query paramter(/page?callback=funcName) then regular JSON is returned */
router.get('/jsonp-page', (req, res) => {
  res.jsonp([{name: 'Chucks', who: 'Dev'}, {name: 'Chucks', who: 'Painist'}, {name: 'Chucks', who: 'Millionaire'}]);
});
/* to see JSONP in action, use the url localhost:9000/jsonp-page?callback=myfunc*/

/** use res.redirect() to redirect  */
router.get('/redirect/page', (req, res) => {
  //res.redirect('/');
  //res.redirect('http://tochukwu.xyz');
  res.redirect('../json-page');
});

router.get('/music/moonlight', (req, res) => {
  const moonlight = path.join(__dirname, '../downloads/moonlight.pdf');
  //res.sendFile(moonlight);
  res.download(moonlight);
});
/* You can redirect to relative or absolute url. res.redirect() will send status code of 302 - "Temporarily Moves" automatically*/


/** None Stream, synchronuous read */
router.get('/none-stream', (req, res) => {
  const file = fs.readFileSync(path.join(__dirname, '../downloads/skit.mp4'));
  res.end(file);
});

/* None Stream, asychronuous read*/
router.get('/none-stream-2', (req, res) => {
  const file = fs.readFile(path.join(__dirname, '../downloads/skit.mp4'), (err, data) => {
    if (err) {
     throw err;
    }
    res.end(data);
  });
});

/** Streams. Best used for very large file or data  */
router.get('/stream', (req, res) => {
  const stream = fs.createReadStream(path.join(__dirname, '../downloads/skit.mp4'));
  stream.pipe(res);
});

/** Stream 2. For even larger files */
router.get('/stream-2', (req, res) => {
  const stream = fs.createReadStream(path.join(__dirname, '../downloads/skit.mp4'));
  stream.on('data', data => {
    res.write(data);
  });
  stream.on('end', () => {
    res.end();
  })
  stream.on('error', err => {
    console.error("\x1b[31m", err);
  });
});

router.get('/video', (req, res) => {
  res.render('music')
});
module.exports = router;
