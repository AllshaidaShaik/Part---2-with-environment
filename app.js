const config  = require('./config/config.json')["development"];
const evn = config;

global.components = {
    express: express,
    config: evn,
    dbConnections: {},
  };
  
  var bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    server;
  
  const { logger } = require('./src/shared/logger');
  logger.info('using environment: ', process.env.NODE_ENV);
  
  app.use(bodyParser.json({limit: '50mb', extended: true}))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
  require('./shared/db/connection');
  
  const cors = require('cors');
  app.use(cors());
  
  app.disable('etag');
  require('./src/transaction-handler/module')(app);
  
  server = app.listen(global.components.config.application.port, function() {
    var host = server.address().address;
    var port = server.address().port;
    logger.info('App listening at http://%s:%s', host, port);
  });
  
  process.on('uncaughtException', function(err) {
    logger.fatal('Uncaught exception ' + err);
  });
 
  module.exports = server;
  