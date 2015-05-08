var Compiler		= require('./compiler');
var HbsCompiler		= require('./compiler.hbs');
var SassCompiler	= require('./compiler.sass');
var utils			= base.require('core/utils');
var compiler		= new Compiler();

compiler.add('hbs', new HbsCompiler());
compiler.add('scss', new SassCompiler(), function * (directory, file) {
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