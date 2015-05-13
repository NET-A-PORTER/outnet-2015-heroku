var Style	= require('./style');
var utils 	= base.require('core/utils');
var Styles	= (baseDir) => ***REMOVED***
	if (!baseDir) throw new Error('No base directory specified');
	this.baseDir = baseDir;
***REMOVED***

// TODO: caching of loaded style directories
Styles.prototype.getAll = function * () ***REMOVED***
	var baseDir = this.baseDir;
	var projects = yield utils.glob('*', ***REMOVED*** cwd: baseDir ***REMOVED***);

	// read style directory
	return Promise.all(
		// get defintion of each style
		projects.map(project => new Style(project, baseDir).getDefinition())
	);
***REMOVED***;

module.exports = Styles;