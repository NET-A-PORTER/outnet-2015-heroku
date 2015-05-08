var sass	= require('node-sass');
var utils	= base.require('core/utils');

function SassCompiler() ***REMOVED***
	return function * (directory, file) ***REMOVED***
		// async sass.render isn't working for some reason
		var path = directory + '/' + file;
		var compiled = sass.renderSync(***REMOVED*** file: path ***REMOVED***).css;
		var source = yield utils.readFile(path);

		return ***REMOVED***
			compiled: compiled,
			source: source
		***REMOVED***;
	***REMOVED***;
***REMOVED***


module.exports = SassCompiler;