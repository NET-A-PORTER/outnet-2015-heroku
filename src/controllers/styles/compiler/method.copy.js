var fs = require('fs');

function copyMethod(targetPath) ***REMOVED***
	return function * (directory, file) ***REMOVED***
		var src = directory + '/' + file;
		var target = targetPath + '/' + file;

		fs.createReadStream(src)
			.pipe(fs.createWriteStream(target));

		return targetPath;
	***REMOVED***;
***REMOVED***

module.exports = copyMethod;