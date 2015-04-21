var hbs	= require('koa-handlebars');
var app	= base.require('server');

app.use(hbs({
	root: base.path('.'),
	defaultLayout: 'main'
}));