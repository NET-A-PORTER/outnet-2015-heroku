var fs		= require('fs');
var sass	= require('node-sass');
var render	= require('./render');

function readFromFile(path) ***REMOVED***
	return new Promise((resolve, reject) => ***REMOVED***
		fs.readFile(path, ***REMOVED*** encoding: 'utf-8' ***REMOVED***, (err, contents) => ***REMOVED***
			if (err) return reject(err);
			resolve(contents);
		***REMOVED***);
	***REMOVED***);
***REMOVED***

function compileSass(path) ***REMOVED***
	// async sass.render isn't working for some reason
	return sass.renderSync(***REMOVED*** file: path ***REMOVED***);
***REMOVED***

function * StyleContent(baseDir) ***REMOVED***
	this.scss = yield readFromFile(baseDir + '/style.scss');
	this.css = (yield compileSass(baseDir + '/style.scss')).css;

	var markup = yield readFromFile(baseDir + '/markup.hbs');
	this.markup = render(markup);
	return this;
***REMOVED***

StyleContent.prototype.toJSON = () => ***REMOVED***
	return ***REMOVED***
		markup: this.markup,
		scss: this.scss,
		css: this.css
	***REMOVED***;
***REMOVED***;

module.exports = StyleContent;