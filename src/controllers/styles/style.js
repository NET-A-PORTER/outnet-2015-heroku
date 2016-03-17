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
		return utils
			.readFile(self.path + '/definition.json')
			.then((contents) => {
				var parsed = JSON.parse(contents);
				parsed.name = self.name;
				return parsed;
			});
	},
	getElement: function * (name) {
		return yield * new Element({dir: this.path + '/' + name});
	},
  build: function * () {
    yield * new Element({dir: this.path, files: ['styles.scss']});
  }
};

module.exports = Style;
