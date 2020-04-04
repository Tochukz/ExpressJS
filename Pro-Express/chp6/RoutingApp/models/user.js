const db = require('../db');

module.exports.findUserByUsername = function(username, callback) {
  const user = db.users.find(user => user.username == username);
  if(!user) {
      return callback(new Error(`No user matching ${username}`));
  }
  return callback(null, user);
}

module.exports.findUserById = function(id, callback) {
  const user = db.users.find(user => user.id == id);
  if (!user) {
      return callback(new Error(`User with ID ${id} not found`))
  }
  return callback(null, user);
}
