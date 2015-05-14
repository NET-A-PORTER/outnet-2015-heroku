var fs = require('fs');

function copyMethod(targetPath) {
	return function * (directory, file) {
		var src = directory + '/' + file;
		var target = targetPath + '/' + file;

		fs.createReadStream(src)
			.pipe(fs.createWriteStream(target));

		return targetPath;
	};
}

module.exports = copyMethod;