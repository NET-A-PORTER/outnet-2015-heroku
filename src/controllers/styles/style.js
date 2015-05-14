var utils		= base.require('core/utils');
var Element		= require('./element');


function Style(name, baseDir) ***REMOVED***
	this.name = name;
	this.path = baseDir + '/' + name;
	return this;
***REMOVED***

Style.prototype = ***REMOVED***
	getDefinition: () => ***REMOVED***
		var self = this;
		return utils
			.readFile(self.path + '/definition.json')
			.then((contents) => ***REMOVED***
				var parsed = JSON.parse(contents);
				parsed.name = self.name;
				return parsed;
			***REMOVED***);
	***REMOVED***,
	getElement: function * (name) ***REMOVED***
		return yield new Element(this.path + '/' + name);
	***REMOVED***
***REMOVED***;

module.exports = Style;