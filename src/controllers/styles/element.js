var compiler	= require('./compiler');
var utils 		= base.require('core/utils');

function * StyleElement(baseDir) {
	var assets = yield utils.glob('**', { cwd: baseDir });
	this.assets = yield * compiler.process(baseDir, assets);
	return this;
}

module.exports = StyleElement;
