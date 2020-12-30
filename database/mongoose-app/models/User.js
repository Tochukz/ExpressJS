const mongoose =  require('../database/mongoose');

const userSchema = require('../schemas/user');

const User = mongoose.model('User', userSchema);

module.exports = User;