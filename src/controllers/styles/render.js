var hbs		= require('handlebars');

// TODO: take helpers out of server, place client side
hbs.registerHelper('markup', (opt) => ***REMOVED***
	var output = opt.fn();
	var escaped = hbs.Utils.escapeExpression(output)
		.replace(/(\r\n|\n|\r)/gm, '<br>')
		.replace(/(\t)/gm, '&nbsp;&nbsp;');
	var markup = '<code class="html preston-markup">' + escaped + '</code>';
	return output + markup;
***REMOVED***);

// NOTE: this function caters for wrapped block helpers or inline helpers
// Use 1: ***REMOVED******REMOVED***#helper-method***REMOVED******REMOVED*** ... ***REMOVED******REMOVED***/helper-method***REMOVED******REMOVED***
// Use 2: ***REMOVED******REMOVED******REMOVED***helper-method "some text entered here"***REMOVED******REMOVED******REMOVED***
function sections(type, opt) ***REMOVED***
	var content = opt.fn && opt.fn() || '';
	var title = opt.hash ? opt.hash.title : opt;
	var wrapper = title
		? '<' + type + '>' + title + '</' + type + '>'
		: '';
	return wrapper + content;
***REMOVED***

hbs.registerHelper('section', opt => sections('h3', opt))
hbs.registerHelper('sub-section', opt => sections('h4', opt));
hbs.registerHelper('detail', opt => sections('p', opt));

module.exports = (markup) => ***REMOVED***
	return hbs.compile(markup)();
***REMOVED***;