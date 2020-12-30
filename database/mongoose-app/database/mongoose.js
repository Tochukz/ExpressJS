const mongoose = require('mongoose');

const {NODE_ENV, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT} = process.env;
const autoIndex = NODE_ENV == 'production' ? false : true;

const connectionStr = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
//const connectionStr = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
mongoose.connect(connectionStr, { autoIndex, useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;