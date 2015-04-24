var serve		= require('koa-static');
var publicDir	= base.path('client');
var app			= base.require('server');

app.use(serve(publicDir));