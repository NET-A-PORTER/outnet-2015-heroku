var router	= require('koa-router');
var app		= base.require('server');

app.use(router(app));

base.require('routes/home');
base.require('routes/styles');