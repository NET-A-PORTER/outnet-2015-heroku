var fs = require('fs');
var Styles = (baseDir) => {
	if (!baseDir) throw new Error('No base directory specified');
	this.baseDir = baseDir;
}

Styles.prototype.getAll = function * () {
	var that = this;
	return new Promise((resolve, reject) => {
		fs.readdir(that.baseDir, (err, result) => {
			if (err) reject(err);
			resolve(result);
		});
	});
};

module.exports = Styles;