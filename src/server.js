module.exports = require('koa')();

require('./global');
require('./core/serve');
require('./core/views');
require('./core/router');
require('./core/start');