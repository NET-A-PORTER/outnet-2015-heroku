var fs = require('fs');
var utils	= base.require('core/utils');

function copyMethod(targetPath) {
	return function * (directory, file, name) {
		var src = directory + '/' + file;
		var targetFile = name ? name : file;
		var target = targetPath + '/' + targetFile;

		var contents = yield utils.readFile(src, {encoding: null});
		yield utils.writeFile(target, contents);

		return targetPath;
	};
}

module.exports = copyMethod;
