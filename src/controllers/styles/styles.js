var Style	= require('./style');
var utils 	= base.require('core/utils');
var Styles	= (baseDir) => {
	if (!baseDir) throw new Error('No base directory specified');
	this.baseDir = baseDir;
}

// TODO: caching of loaded style directories
Styles.prototype.getAll = function * () {
	var baseDir = this.baseDir;
	var projects = yield utils.glob('*', { cwd: baseDir });
	// read style directory
  return yield Promise.all(
		// get defintion of each style
		projects.map(project => new Style(project, baseDir).getDefinition())
	);
};

module.exports = Styles;
