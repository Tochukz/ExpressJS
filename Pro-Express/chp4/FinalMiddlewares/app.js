const fs = require('fs');
const path = require('path');

const express = require('express');
const busboy =require('connect-busboy');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

/** Middleware for file upload */
app.use('/upload', busboy({immediate: true}));
app.post('/upload', (req, res) => {
 req.busboy.on('file', (fieldName,  file, filename, encoding, mimetype) => {
   file.on('data', data => {
    fs.writeFile(`public/uploads/${filename}`, data, (err) => {
        if (err) {
            console.log(err);
        }
    });
   });
   file.on('end', () => {
       console.log(`${filename} is uploaded!`);
   });
 });

 req.busboy.on('finish', () => {
  console.log('Busboy upload is completed!');
  res.redirect('/fileupload.html');
  //res.status(201).end();
 });
});

app.listen(9000, () => console.log('Server is running on port 9000'));

/* Upload file from command line */
// curl -X POST -i -F name=chucks -F profilepic=@./triathlon.png http://localhost:9000/upload
// Here the file triathlon.png is in the current directory