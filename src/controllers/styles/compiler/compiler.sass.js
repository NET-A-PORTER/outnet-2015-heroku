var sass	= require('node-sass');
var utils	= base.require('core/utils');

function SassCompiler() {
	return function * (directory, file) {
		// async sass.render isn't working for some reason
		var path = directory + '/' + file;
		var compiled = sass.renderSync({ file: path }).css;
		var source = yield utils.readFile(path);

		return {
			compiled: compiled,
			source: source
		};
	};
}


module.exports = SassCompiler;