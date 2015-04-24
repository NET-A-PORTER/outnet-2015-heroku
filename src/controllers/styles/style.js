var fs = require('fs');

function Style(name, baseDir) ***REMOVED***
	this.name = name;
	this.path = baseDir + '/' + name;
	return this;
***REMOVED***

Style.prototype.getDefinition = () => ***REMOVED***
	var self = this;
	return new Promise((resolve, reject) => ***REMOVED***
		fs.readFile(self.path + '/definition.json', (err, result) => ***REMOVED***
			if (err) return reject(err);

			var output = ***REMOVED*** name: self.name ***REMOVED***;
			var parsed = JSON.parse(result);
			for (var i in parsed) ***REMOVED***
				// name of style cannot be overridden to ensure
				// reading of style directory is maintained
				if (i != 'name') output[i] = parsed[i];
			***REMOVED***
			resolve(output);
		***REMOVED***);
	***REMOVED***);
***REMOVED***;

module.exports = Style;