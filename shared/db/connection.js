module.exports = function () {

 
    const fs        = require('fs');
    const path      = require('path');
    const Sequelize = require('sequelize');
    const basename  = path.basename(module.filename);
    const _ = require('lodash');
    const config    = require('../../config/config.json');
    const evn = config.development;
    // console.log("evn", evn)
    const directory  = `${__dirname}/data-definitions`;
    // console.log("config", config, process.env.NODE_ENV,development)
    const sequelize = new Sequelize(evn.database, evn.username, evn.password, evn);
    fs
      .readdirSync(directory)
      .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
      })
      .forEach(function(file) {
        if (file.slice(-5) !== '.json') return;    
        let json = require(`./data-definitions/${file}`);
        const model = sequelize.define(_.get(file.split('.'),'[0]', ''), json.dataDefinitions);
        global.components.dbConnections[model.name] = model;
      });
    Object.keys(global.components.dbConnections).forEach(function(modelName) {
      if (modelName.associate) {
        modelName.associate(global.components.dbConnections);
      }
    });
  
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.log('Unable to connect to the database:', err);
      });
  
    global.components.dbConnections.sequelize = sequelize;
    global.components.sequelize = sequelize;  
  }();
  