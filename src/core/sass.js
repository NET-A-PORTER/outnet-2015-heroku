var sass		= require('node-sass-middleware');
var app			= base.require('server');
var publicDir	= base.path('client');
var stylesDir	= base.path('styles');

// compile app styles
app.use(function * (next) ***REMOVED***
	yield sass(***REMOVED***
		src: publicDir,
		debug: true
	***REMOVED***).bind(sass, this.req, this.res);
	yield next;
***REMOVED***);

// compile styles
app.use(function * (next) ***REMOVED***
	yield sass(***REMOVED***
		src: stylesDir,
		dest: publicDir + '/css',
		prefix: '/css'
	***REMOVED***).bind(sass, this.req, this.res);
	yield next;
***REMOVED***);