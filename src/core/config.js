var convict = require('convict');
var schema = base.require('../config/schema.json');

var conf = convict(schema);
conf.loadFile('config/' + conf.get('env') + '.json');

module.exports = conf;
