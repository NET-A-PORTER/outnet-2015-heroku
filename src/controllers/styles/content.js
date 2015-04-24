var fs = require('fs');

function * StyleContent(baseDir) {

	// read markup in content directory
	this.markup = yield new Promise((resolve, reject) => {
		var options = { encoding: 'utf-8', };
		fs.readFile(baseDir + '/markup.html', options, (err, contents) => {
			if (err) return reject(err);
			resolve(contents);
		});
	});
	return this;
}

StyleContent.prototype.toJSON = function() {
	return {
		markup: this.markup
	};
};

module.exports = StyleContent;