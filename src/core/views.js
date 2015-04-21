var hbs	= require('koa-handlebars');
var app	= base.require('server');

app.use(hbs(***REMOVED***
	root: base.path('.'),
	defaultLayout: 'main'
***REMOVED***));