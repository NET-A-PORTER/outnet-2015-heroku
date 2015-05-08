var compiler	= require('./compiler');
var utils 		= base.require('core/utils');

function * StyleElement(baseDir) ***REMOVED***
	var assets = yield utils.readDir(baseDir);
	this.assets = yield compiler.process(baseDir, assets);
	return this;
***REMOVED***

module.exports = StyleElement;