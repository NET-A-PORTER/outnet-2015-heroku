var utils		= base.require('core/utils');
var Element		= require('./element');


function Style(name, baseDir) {
	this.name = name;
	this.path = baseDir + '/' + name;
	return this;
}

Style.prototype = {
	getDefinition: () => {
		var self = this;
		return utils.readFile(self.path + '/definition.json', (err, result) => {
			if (err) return reject(err);

			var parsed = JSON.parse(result);
			parsed.name = self.name;
			resolve(parsed);
		});
	},
	getElement: function * (name) {
		return yield new Element(this.path + '/' + name);
	}
};

module.exports = Style;