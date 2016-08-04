var compiler					  = require('./compiler');
var DocumentCompiler    = require('./compiler.doc');
var SassCompiler			  = require('./compiler.sass');
var JavascriptCompiler	= require('./compiler.script');
var CopyMethod				  = require('./method.copy');
var utils							  = base.require('core/utils');
var assetPath					  = base.path('client');

compiler.add(/document\.yml/ig, new DocumentCompiler());
compiler.add(/(\.woff|\.ttf|\.eot|\.svg|\.png|\.js)/ig, new CopyMethod(assetPath));
compiler.add(/\.js/ig, new JavascriptCompiler(assetPath));
compiler.add(/\.scss/ig, new SassCompiler(), function * ({directory, file, baseDir}) {
	// save to css directory
	var infoArr = directory.split('/');
  var info = infoArr.slice(infoArr.lastIndexOf(baseDir));
	var basePath = base.path('client/css');
	var fullPath = [basePath, ...info].join('/') ;
	var filename = file.replace(/(\.scss)$/, '.css');
	var path = fullPath + '/' + filename;

	yield utils.writeFile(path, this.body.compiled);
	return this.body;
});

module.exports = compiler;
