const express = require('express');
const router = express.Router();

module.exports = function ( app ) {
  app.use('/backend_service/v1/:model', require('./routes')(router));
};
