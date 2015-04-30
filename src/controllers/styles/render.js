var hbs		= require('handlebars');

// TODO: take helpers out of server, place client side
hbs.registerHelper('markup', (opt) => {
	var output = opt.fn();
	var escaped = hbs.Utils.escapeExpression(output)
		.replace(/(\r\n|\n|\r)/gm, '<br>')
		.replace(/(\t)/gm, '&nbsp;&nbsp;');
	var markup = '<code class="html preston-markup">' + escaped + '</code>';
	return output + markup;
});

// NOTE: this function caters for wrapped block helpers or inline helpers
// Use 1: {{#helper-method}} ... {{/helper-method}}
// Use 2: {{{helper-method "some text entered here"}}}
function sections(type, opt) {
	var content = opt.fn && opt.fn() || '';
	var title = opt.hash ? opt.hash.title : opt;
	var wrapper = title
		? '<' + type + '>' + title + '</' + type + '>'
		: '';
	return wrapper + content;
}

hbs.registerHelper('section', opt => sections('h2', opt))
hbs.registerHelper('sub-section', opt => sections('h3', opt));
hbs.registerHelper('detail', opt => sections('p', opt));

module.exports = (markup) => {
	return hbs.compile(markup)();
};