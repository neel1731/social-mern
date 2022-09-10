const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../.env') });
const fs = require('fs');

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI,
  },
}  