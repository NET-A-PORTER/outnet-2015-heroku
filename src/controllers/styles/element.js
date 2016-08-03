var compiler	= require('./compiler');
var utils 		= base.require('core/utils');

function * StyleElement({files, dir, baseDir} = {}) {
  if(files) files = '*(' + files.join('|') + ')';
	var assets = yield utils.glob(files || '**', { cwd: dir });
	this.assets = yield * compiler.process(dir, assets, baseDir);
	return this;
}

module.exports = StyleElement;
