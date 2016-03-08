var compiler	= require('./compiler');
var utils 		= base.require('core/utils');

function * StyleElement(opts) ***REMOVED***
  var files = opts.files;
  var dir = opts.dir;
  if(files) files = '*(' + files.join('|') + ')';
	var assets = yield utils.glob(files || '**', ***REMOVED*** cwd: dir ***REMOVED***);
	this.assets = yield * compiler.process(dir, assets);
	return this;
***REMOVED***

module.exports = StyleElement;
