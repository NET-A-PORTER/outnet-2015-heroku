var fs	= require('fs');
var hbs	= require('handlebars');

hbs.registerHelper('markup', (opt) => ***REMOVED***
	var output = opt.fn();
	var escaped = hbs.Utils.escapeExpression(output)
		.replace(/(\r\n|\n|\r)/gm, '<br>')
		.replace(/(\t)/gm, '&nbsp;&nbsp;');
	var markup = '<code class="html preston-markup">' + escaped + '</code>';
	return output + markup;
***REMOVED***);

function * StyleContent(baseDir) ***REMOVED***

	// read markup in content directory
	this.markup = yield new Promise((resolve, reject) => ***REMOVED***
		var options = ***REMOVED*** encoding: 'utf-8', ***REMOVED***;
		fs.readFile(baseDir + '/markup.hbs', options, (err, contents) => ***REMOVED***
			if (err) return reject(err);
			var template = hbs.compile(contents);
			var compiled = template();
			resolve(compiled);
		***REMOVED***);
	***REMOVED***);
	return this;
***REMOVED***

StyleContent.prototype.toJSON = () => ***REMOVED***
	return ***REMOVED***
		markup: this.markup
	***REMOVED***;
***REMOVED***;

module.exports = StyleContent;