var sass	= require('node-sass');
var utils	= base.require('core/utils');

function SassCompiler() {
	return function * (directory, file) {
		// async sass.render isn't working for some reason
		var path = directory + '/' + file;
    var includePaths = path.split('/');
    includePaths.pop();
    includePaths = includePaths.join('/');
		var source = yield utils.readFile(path);
		var compiled = sass.renderSync({
			data: source,
			includePaths: [includePaths]
		}).css;

		return {
			compiled: compiled,
			source: source
		};
	};
}


module.exports = SassCompiler;
