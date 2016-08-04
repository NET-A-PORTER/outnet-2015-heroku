var fs = require('fs');
var utils	= base.require('core/utils');

function JavascriptCompiler() {
	return function * ({directory, file, name}) {
		var src = directory + '/' + file;
		var contents = yield utils.readFile(src);
		return contents;
	};
}

module.exports = JavascriptCompiler;
