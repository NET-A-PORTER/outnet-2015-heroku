var sass		= require('node-sass-middleware');
var app			= base.require('server');
var publicDir	= base.path('client');
var stylesDir	= base.path('styles');

// compile app styles
app.use(function * (next) {
	yield sass({
		src: publicDir,
		debug: true
	}).bind(sass, this.req, this.res);
	yield next;
});

// compile styles
app.use(function * (next) {
	yield sass({
		src: stylesDir,
		dest: publicDir + '/css',
		prefix: '/css'
	}).bind(sass, this.req, this.res);
	yield next;
});