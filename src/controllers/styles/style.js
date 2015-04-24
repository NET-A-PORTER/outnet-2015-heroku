var fs = require('fs');

function Style(name, baseDir) {
	this.name = name;
	this.path = baseDir + '/' + name;
	return this;
}

Style.prototype.getDefinition = () => {
	var self = this;
	return new Promise((resolve, reject) => {
		fs.readFile(self.path + '/definition.json', (err, result) => {
			if (err) return reject(err);

			var output = { name: self.name };
			var parsed = JSON.parse(result);
			for (var i in parsed) {
				// name of style cannot be overridden to ensure
				// reading of style directory is maintained
				if (i != 'name') output[i] = parsed[i];
			}
			resolve(output);
		});
	});
};

module.exports = Style;