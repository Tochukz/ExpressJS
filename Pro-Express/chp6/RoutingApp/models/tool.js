const db = require('../db');

module.exports.find = function(id, callback) {
  const tool =  db.tools.find(tool => tool.id == id);
  if (!tool) {
    callback(new Error(`Tool with ID ${id} not found`));
  }
  callback(null, tool);
}

module.exports.get = function(callback) {
  callback(null, db.tools);
}

module.exports.create = function(tool, callback) {
    tool.id = db.tools[db.tools.length-1].id + 1;
    db.tools.push(tool);
    callback(null, db.tools[db.tools.length-1]);
}

module.exports.update = function(tool, callback) {
    const index = db.tools.findIndex(t => tool.id == t.id);
    if (index < 0) {
        callback(new Error(`Tool with ID ${tool.id} was not found`))
    } else {
        tool.id = parseInt(tool.id);
        db.tools[index] = Object.assign(db.tools[index], tool);
        callback(null, db.tools[index]);
    }
    
}

module.exports.delete = function(id, callback) {
    const index = db.tools.findIndex(tool => id == tool.id) 
    if (index > -1) {
      db.tools.splice(index, 1);
    }
    callback(null, id);
}