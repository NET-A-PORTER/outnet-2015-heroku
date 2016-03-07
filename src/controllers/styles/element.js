var compiler	= require('./compiler');
var utils 		= base.require('core/utils');

function * StyleElement(opts) ***REMOVED***
  var pattern = opts.files ? '*(' + opts.files.join('|') + ')' : '**';
	var assets = yield utils.glob(pattern, ***REMOVED*** cwd: opts.dir ***REMOVED***);
	this.assets = yield * compiler.process(opts.dir, assets);
	return this;
***REMOVED***

module.exports = StyleElement;
