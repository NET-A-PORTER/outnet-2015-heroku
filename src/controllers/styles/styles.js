var fs		= require('fs');
var Style	= require('./style');
var Styles	= (baseDir) => {
	if (!baseDir) throw new Error('No base directory specified');
	this.baseDir = baseDir;
}

// TODO: caching of loaded style directories
Styles.prototype.getAll = function * () {
	var baseDir = this.baseDir;
	return new Promise((resolve, reject) => {
		// read style directory
		fs.readdir(baseDir, (err, projects) => {
			if (err) return reject(err);
			return Promise.all(
				// get defintion of each style
				projects.map(project => new Style(project, baseDir).getDefinition())
			).then(resolve, reject);
		});
	});
};

module.exports = Styles;