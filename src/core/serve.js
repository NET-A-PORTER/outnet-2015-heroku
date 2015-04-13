var serve		= require('koa-static');
var app			= base.require('server');
var publicDir	= base.path('client');

app.use(serve(publicDir));