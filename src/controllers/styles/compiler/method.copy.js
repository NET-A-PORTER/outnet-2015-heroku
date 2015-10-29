var fs = require('fs');
var utils	= base.require('core/utils');

function copyMethod(targetPath) ***REMOVED***
	return function * (directory, file) ***REMOVED***
		var src = directory + '/' + file;
		var target = targetPath + '/' + file;

    var contents = yield utils.readFile(src, ***REMOVED***encoding: null***REMOVED***);
    yield utils.writeFile(target, contents);

		return targetPath;
	***REMOVED***;
***REMOVED***

module.exports = copyMethod;
