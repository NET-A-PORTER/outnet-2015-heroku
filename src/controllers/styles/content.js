var fs	= require('fs');
var hbs	= require('handlebars');

hbs.registerHelper('markup', (opt) => {
	var output = opt.fn();
	var escaped = hbs.Utils.escapeExpression(output)
		.replace(/(\r\n|\n|\r)/gm, '<br>')
		.replace(/(\t)/gm, '&nbsp;&nbsp;');
	var markup = '<code class="html preston-markup">' + escaped + '</code>';
	return output + markup;
});

function * StyleContent(baseDir) {

	// read markup in content directory
	this.markup = yield new Promise((resolve, reject) => {
		var options = { encoding: 'utf-8', };
		fs.readFile(baseDir + '/markup.hbs', options, (err, contents) => {
			if (err) return reject(err);
			var template = hbs.compile(contents);
			var compiled = template();
			resolve(compiled);
		});
	});
	return this;
}

StyleContent.prototype.toJSON = () => {
	return {
		markup: this.markup
	};
};

module.exports = StyleContent;