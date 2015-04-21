var app		= require('koa')();
var router	= require('koa-router');
var serve	= require('koa-static');
var utils	= require('./global');

module.exports = app;

require('./core/serve');
require('./core/views');
require('./core/router');
require('./core/start');