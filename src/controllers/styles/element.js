var compiler	= require('./compiler');
var utils 		= base.require('core/utils');

function * StyleElement(opts) {
  var pattern = opts.files ? '*(' + opts.files.join('|') + ')' : '**';
	var assets = yield utils.glob(pattern, { cwd: opts.dir });
	this.assets = yield * compiler.process(opts.dir, assets);
	return this;
}

module.exports = StyleElement;
