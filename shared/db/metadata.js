const defaultConfig = require(`./data-definitions/index`);

module.exports = function () {
  return {
    getMetadataConfig(key, sub, config = defaultConfig) {       
      return sub ? config[key][sub] : config[key];
    }
  };
}();
