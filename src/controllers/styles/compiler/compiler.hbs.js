var hbs		= require('handlebars');
var utils	= base.require('core/utils');

// NOTE: this function caters for wrapped block helpers or inline helpers
// Use 1: {{#helper-method}} ... {{/helper-method}}
// Use 2: {{{helper-method "some text entered here"}}}
function sections(type, opt) {
	var content = opt.fn && opt.fn() || '';

	// do I want to present it?
	if (opt.data && opt.data.root === true) {
		var title = opt.hash ? opt.hash.title : opt;
		var wrapper = title
			? '<' + type + '>' + title + '</' + type + '>'
			: '';

		content = '<div class="preston-' + type + '">' + wrapper + content + '</div>'
	} else {
		// has content already been escaped?
		if (content.indexOf('&lt;') === -1) {
			// display raw html (without helper formatting)
			content = hbs.Utils.escapeExpression(content)
			.replace(/(\r\n|\n|\r)/gm, '<br>')
			.replace(/(\t)/gm, '&nbsp;&nbsp;');
		}
	}

	return content;
}

[
	{ name: 'section', element: 'h3'},
	{ name: 'sub-section', element: 'h4'},
	{ name: 'detail', element: 'p'}
].forEach((item) => {
	hbs.registerHelper(item.name, opt => sections(item.element, opt));
});

function HandlebarsCompiler() {
	return function * (directory, file) {
		var path = directory + '/' + file;
		var markup = yield utils.readFile(path);
		return {
			markup: hbs.compile(markup)(true),
			html: hbs.compile(markup)(false)
		}
	};
}

module.exports = HandlebarsCompiler;
