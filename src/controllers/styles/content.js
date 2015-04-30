var fs		= require('fs');
var sass	= require('node-sass');
var render	= require('./render');

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
	this.markup = render(markup);
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