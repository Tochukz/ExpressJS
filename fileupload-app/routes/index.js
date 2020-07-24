var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/fileupload', (req, res , next) => {
  console.log('files', req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded');
  }
  const profileFile = req.files.profile;
  const filename = profileFile.name;
  profileFile.mv(path.join(__dirname, `/../uploads/${filename}`), (err) => {
    if (err) {
      next(err);
    }
    res.json({message: 'File uploaded successfully'});
  });
});

router.post('/multifile', (req, res , next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded');
  }
  req.files.profiles.forEach(file => {
    const name = file.name;
    file.mv(path.join(__dirname, `/../uploads/${name}`), (err) => {
      if (err) {
        next(err);
      }
    });
  });
  res.json({message: 'File uploaded successfully'});
});

module.exports = router;
