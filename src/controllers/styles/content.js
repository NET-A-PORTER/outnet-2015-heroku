var fs = require('fs');

function * StyleContent(baseDir) ***REMOVED***

	// read markup in content directory
	this.markup = yield new Promise((resolve, reject) => ***REMOVED***
		var options = ***REMOVED*** encoding: 'utf-8', ***REMOVED***;
		fs.readFile(baseDir + '/markup.html', options, (err, contents) => ***REMOVED***
			if (err) return reject(err);
			resolve(contents);
		***REMOVED***);
	***REMOVED***);
	return this;
***REMOVED***

StyleContent.prototype.toJSON = function() ***REMOVED***
	return ***REMOVED***
		markup: this.markup
	***REMOVED***;
***REMOVED***;

module.exports = StyleContent;