var serve		= require('koa-static');
var sass		= require('node-sass-middleware');
var sassDir		= base.path('client/sass');
var publicDir	= base.path('client');
var app			= base.require('server');

// compile sass on the fly
app.use(function * (next) ***REMOVED***
	yield sass(***REMOVED***
	    src: base.path('client'),
	    debug: true
	***REMOVED***).bind(sass, this.req, this.res);
	yield next;
***REMOVED***);

app.use(serve(publicDir));