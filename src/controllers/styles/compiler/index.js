var compiler					= require('./compiler');
var DocumentCompiler	= require('./compiler.doc');
var SassCompiler			= require('./compiler.sass');
var CopyMethod				= require('./method.copy');
var utils							= base.require('core/utils');
var assetPath					= base.path('client');

compiler.add(/document\.yml/ig, new DocumentCompiler());
compiler.add(/(\.woff|\.ttf|\.eot|\.svg|\.png)/ig, new CopyMethod(assetPath));
compiler.add(/\.scss/ig, new SassCompiler(), function * (directory, file) {
	// save to css directory
	var info = directory.split('/').slice(-2);
	var basePath = base.path('client/css');
	var fullPath = basePath + '/' + info[0] + '/' + info[1];
	var filename = file.replace(/(\.scss)$/, '.css');
	var path = fullPath + '/' + filename;

	yield utils.writeFile(path, this.body.compiled);
	return this.body;
});

module.exports = compiler;
