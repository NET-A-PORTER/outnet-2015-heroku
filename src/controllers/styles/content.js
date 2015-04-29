var fs		= require('fs');
var hbs		= require('handlebars');
var sass	= require('node-sass');

hbs.registerHelper('markup', (opt) => {
	var output = opt.fn();
	var escaped = hbs.Utils.escapeExpression(output)
		.replace(/(\r\n|\n|\r)/gm, '<br>')
		.replace(/(\t)/gm, '&nbsp;&nbsp;');
	var markup = '<code class="html preston-markup">' + escaped + '</code>';
	return output + markup;
});

function readFromFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, { encoding: 'utf-8' }, (err, contents) => {
			if (err) return reject(err);
			resolve(contents);
		});
	});
}

function compileSass(path) {
	// async sass.render isn't working for some reason
	return sass.renderSync({ file: path });
}

function * StyleContent(baseDir) {
	this.scss = yield readFromFile(baseDir + '/style.scss');
	this.css = (yield compileSass(baseDir + '/style.scss')).css;

	var markup = yield readFromFile(baseDir + '/markup.hbs');
	this.markup = hbs.compile(markup)();
	return this;
}

StyleContent.prototype.toJSON = () => {
	return {
		markup: this.markup,
		scss: this.scss,
		css: this.css
	};
};

module.exports = StyleContent;