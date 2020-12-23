const express = require('express');
const xml2js = require('xml2js');

const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;
  console.log(data);
  
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(data);
  res.headers = {
    'Content-Type': 'application/xml',
  };
  res.type('application/xml');
  res.send(xml);
});

module.exports = router;