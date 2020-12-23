const tedious = require('tedious');

const config = {
    server: process.env.DB_SERVER,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        }
    },
    options: {
        database: process.env.DB_NAME
    }
}

function dbConnect() {
  return new Promise((resolve, reject) => {
    connection = new tedious.Connection(config);
    connection.on('connect', (err)=> {
      if (err) {
          return reject(err);
      }
      resolve(connection);
    });
  });
}
module.exports = dbConnect;

