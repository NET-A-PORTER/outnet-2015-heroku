module.exports = require('koa')();

require('./global');
require('./core/sass');
require('./core/serve');
require('./core/views');
require('./core/router');
require('./core/start');