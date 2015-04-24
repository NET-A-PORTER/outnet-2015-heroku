var fs		= require('fs');
var Style	= require('./style');
var Styles	= (baseDir) => ***REMOVED***
	if (!baseDir) throw new Error('No base directory specified');
	this.baseDir = baseDir;
***REMOVED***

// TODO: caching of loaded style directories
Styles.prototype.getAll = function * () ***REMOVED***
	var baseDir = this.baseDir;
	return new Promise((resolve, reject) => ***REMOVED***
		// read style directory
		fs.readdir(baseDir, (err, projects) => ***REMOVED***
			if (err) return reject(err);
			return Promise.all(
				// get defintion of each style
				projects.map(project => new Style(project, baseDir).getDefinition())
			).then(resolve, reject);
		***REMOVED***);
	***REMOVED***);
***REMOVED***;

module.exports = Styles;