const {User, Staff} = require('../models');

const args = process.argv;
let param = {}
if (args.includes('--force')) {
  param = {force: true};
} else if(args.includes('--alter')) {
  param = {alter: true};
}

console.log(param);

User.sync(param);
Staff.sync(param);
