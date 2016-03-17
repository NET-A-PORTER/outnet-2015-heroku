var fs = require('fs');
var utils	= base.require('core/utils');

function copyMethod(targetPath) {
	return function * (directory, file) {
		var src = directory + '/' + file;
		var target = targetPath + '/' + file;

    var contents = yield utils.readFile(src, {encoding: null});
    yield utils.writeFile(target, contents);

		return targetPath;
	};
}

module.exports = copyMethod;
