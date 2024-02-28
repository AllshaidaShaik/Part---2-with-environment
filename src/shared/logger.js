const log4js = require('log4js');
log4js.configure('./config/log4js.json', { reloadSecs: 300 });
const logger = log4js.getLogger();

module.exports = { logger };
