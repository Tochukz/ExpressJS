const users = require('./users');

module.exports.findUserByCred = function(username, password) {
    const user = users.find(user => user.username == username && user.password == password);
    return deleteCred(user)
}

module.exports.findUserById =  function(id) {
    const user = users.find(user => user.id == id);
    return deleteCred(user)
}

module.exports.updateUser = function(user, update) {
    const index = users.findIndex(u=> u.id == user.id);
    if (index > -1) {
        users[index] = Object.assign(user, update);
    }
}

module.exports.usersInfo = function() {
    return users.map(user => ({id: user.id, name: user.name, city: user.city}));
}

function deleteCred(user) {
    if (user) {
      delete user.username;
      delete user.password;
    }
    return user;
}