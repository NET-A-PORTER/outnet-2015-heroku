var Compiler		= require('./compiler');
var HbsCompiler		= require('./compiler.hbs');
var SassCompiler	= require('./compiler.sass');
var CopyMethod		= require('./method.copy');
var utils			= base.require('core/utils');
var assetPath		= base.path('client');
var compiler		= new Compiler();

compiler.add(/\.hbs/ig, new HbsCompiler());
compiler.add(/(\.woff|\.ttf|\.eot|\.svg|\.png)/ig, new CopyMethod(assetPath));
compiler.add(/\.scss/ig, new SassCompiler(), function * (directory, file) ***REMOVED***
	// save to css directory
	var info = directory.split('/').slice(-2);
	var basePath = base.path('client/css');
	var fullPath = basePath + '/' + info[0] + '/' + info[1];
	var filename = file.replace(/(\.scss)$/, '.css');
	var path = fullPath + '/' + filename;

	yield utils.writeFile(path, this.body.compiled);
	return this.body;
***REMOVED***);

module.exports = compiler;
