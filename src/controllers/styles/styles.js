var fs = require('fs');
var Styles = (baseDir) => ***REMOVED***
	if (!baseDir) throw new Error('No base directory specified');
	this.baseDir = baseDir;
***REMOVED***

Styles.prototype.getAll = function * () ***REMOVED***
	var that = this;
	return new Promise((resolve, reject) => ***REMOVED***
		fs.readdir(that.baseDir, (err, result) => ***REMOVED***
			if (err) reject(err);
			resolve(result);
		***REMOVED***);
	***REMOVED***);
***REMOVED***;

module.exports = Styles;