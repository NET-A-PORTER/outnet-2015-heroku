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
	getDefinition: function() {
		return utils
			.readFile(this.path + '/definition.json')
			.then((contents) => {
				var parsed = JSON.parse(contents);
				parsed.name = this.name;
				parsed.assets = config.get('assets').map((asset) => {
					return {
						name: asset.type,
						url: asset.path + '/' + this.name + asset.ext
					};
				})
				return parsed;
			});
	},
	getElement: function * (name) {
    let element = Object.create(Element);
		return yield * Element.call(element, {dir: this.path + '/' + name});
	},
  build: function * () {
    let element = Object.create(Element);
    yield * Element.call(element, {dir: this.path, files: ['styles.scss']});

    //need to refactor;
    copy = new CopyMethod('src/client/css');
    yield * copy('src/client/css/styles/' + this.name, 'styles.css', this.name + '.css')
  }
};

module.exports = Style;
