var express = require('express');
var router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res, next)  => {
  const name = req.body.firstname;
  const user = await  User.find({ firstname });
   // Using the fullname virual (get)
  const fullname = user.fullname;
  const userObj = user.toJSON();  // This will not include any virtual
  const userObj2 = user.toObject(); // This will not include any virtual
  const userWithFullname = user.toJSON({virtuals: true});

});

router.get('/create', (req, res, next) => {
  const user  = new User();
  // using the fullname virtual (set)
  user.fullname = "James Kenneth";
});

module.exports = router;
