var convict = require('convict');
var schema = base.require('../config/schema.json');

var conf = convict(schema);

try {
  conf.loadFile('config/' + conf.get('env') + '.json');
} catch (e) {
  console.error('Couldn\'t load config for', conf.get('env'));
}

module.exports = conf;
