var compiler	= require('./compiler');
var utils 		= base.require('core/utils');

function * StyleElement(opts) {
  var files = opts.files;
  var dir = opts.dir;
  if(files) files = '*(' + files.join('|') + ')';
	var assets = yield utils.glob(files || '**', { cwd: dir });
	this.assets = yield * compiler.process(dir, assets);
	return this;
}

module.exports = StyleElement;
