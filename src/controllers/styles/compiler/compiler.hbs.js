var hbs		= require('handlebars');
var utils	= base.require('core/utils');

// NOTE: this function caters for wrapped block helpers or inline helpers
// Use 1: ***REMOVED******REMOVED***#helper-method***REMOVED******REMOVED*** ... ***REMOVED******REMOVED***/helper-method***REMOVED******REMOVED***
// Use 2: ***REMOVED******REMOVED******REMOVED***helper-method "some text entered here"***REMOVED******REMOVED******REMOVED***
function sections(type, opt) ***REMOVED***
	var content = opt.fn && opt.fn() || '';

	// do I want to present it?
	if (opt.data && opt.data.root === true) ***REMOVED***
		var title = opt.hash ? opt.hash.title : opt;
		var wrapper = title
			? '<' + type + '>' + title + '</' + type + '>'
			: '';

		content = '<div class="preston-' + type + '">' + wrapper + content + '</div>'
	***REMOVED*** else ***REMOVED***
		// has content already been escaped?
		if (content.indexOf('&lt;') === -1) ***REMOVED***
			// display raw html (without helper formatting)
			content = hbs.Utils.escapeExpression(content)
			.replace(/(\r\n|\n|\r)/gm, '<br>')
			.replace(/(\t)/gm, '&nbsp;&nbsp;');
		***REMOVED***
	***REMOVED***

	return content;
***REMOVED***

[
	***REMOVED*** name: 'section', element: 'h3'***REMOVED***,
	***REMOVED*** name: 'sub-section', element: 'h4'***REMOVED***,
	***REMOVED*** name: 'detail', element: 'p'***REMOVED***
].forEach((item) => ***REMOVED***
	hbs.registerHelper(item.name, opt => sections(item.element, opt));
***REMOVED***);

function HandlebarsCompiler() ***REMOVED***
	return function * (directory, file) ***REMOVED***
		var path = directory + '/' + file;
		var markup = yield utils.readFile(path);
		var compiled = hbs.compile(markup);
		return ***REMOVED***
			markup: compiled(true),
			html: compiled(false)
		***REMOVED***
	***REMOVED***;
***REMOVED***

module.exports = HandlebarsCompiler;
