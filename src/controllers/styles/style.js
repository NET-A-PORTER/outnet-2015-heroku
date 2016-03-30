var config 		= base.require('core/config');
var utils		= base.require('core/utils');
var Element		= require('./element');
var CopyMethod  = require('./compiler/method.copy');


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
				parsed.assets = config.get('assets').map(function(asset) {
					return {
						name: asset.type,
						url: asset.path + '/' + self.name + asset.ext
					};
				})
				return parsed;
			});
	},
	getElement: function * (name) {
		return yield * new Element({dir: this.path + '/' + name});
	},
    build: function * () {
        yield * new Element({dir: this.path, files: ['styles.scss']});

		//need to refactor;
        copy = new CopyMethod('src/client/css');
        yield * copy('src/client/css/styles/' + this.name, 'styles.css', this.name + '.css')
    }
};

module.exports = Style;
