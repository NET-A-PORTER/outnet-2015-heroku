var sass	= require('node-sass');
var utils	= base.require('core/utils');

function SassCompiler() ***REMOVED***
	return function * (directory, file) ***REMOVED***
		// async sass.render isn't working for some reason
		var path = directory + '/' + file;
		var source = yield utils.readFile(path);
		var compiled = sass.renderSync(***REMOVED***
			data: source,
			includePaths: [directory]
		***REMOVED***).css;

		return ***REMOVED***
			compiled: compiled,
			source: source
		***REMOVED***;
	***REMOVED***;
***REMOVED***


module.exports = SassCompiler;