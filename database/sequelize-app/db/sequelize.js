const Sequelize = require('sequelize');

const { DB_NAME, DB_HOST, DB_PORT, DB_DIALECT, DB_USER, DB_PASS } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {host: DB_HOST, dialect: DB_DIALECT});

const connectionURI = `${DB_DIALECT}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`; // "mysql://username:password@localhost:3306/dbname";
// const sequelize = new Sequelize(connectionURI, {
//   define: {
//     //timestamps: false,
//     // other global options  
//   }
// }); 

module.exports = sequelize;