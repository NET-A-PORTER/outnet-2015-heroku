var Compiler		= require('./compiler');
var HbsCompiler		= require('./compiler.hbs');
var SassCompiler	= require('./compiler.sass');
var CopyMethod		= require('./method.copy');
var utils			= base.require('core/utils');
var assetPath		= base.path('client');
var compiler		= new Compiler();

compiler.add('.hbs', new HbsCompiler());
compiler.add('(\.woff|\.ttf|\.svg|\.eot)', new CopyMethod(assetPath));
compiler.add('.scss', new SassCompiler(), function * (directory, file) ***REMOVED***
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