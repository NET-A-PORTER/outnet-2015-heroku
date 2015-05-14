var fs		= require('fs');
var glob 	= require('glob');
var mkdirp	= require('mkdirp');

function globFunc(pattern, options) ***REMOVED***
	return new Promise((resolve, reject) => ***REMOVED***
		glob(pattern, options, (err, files) => ***REMOVED***
			if (err) return reject(err);
			resolve(files);
		***REMOVED***);
	***REMOVED***);
***REMOVED***

function readDir(path, filter) ***REMOVED***
	return new Promise((resolve, reject) => ***REMOVED***
		fs.readdir(path, (err, files) => ***REMOVED***
			if (err) return reject(err);
			resolve(files);
		***REMOVED***);
	***REMOVED***);
***REMOVED***

function readFile(path) ***REMOVED***
	return new Promise((resolve, reject) => ***REMOVED***
		fs.readFile(path, ***REMOVED*** encoding: 'utf-8' ***REMOVED***, (err, contents) => ***REMOVED***
			if (err) return reject(err);
			resolve(contents);
		***REMOVED***);
	***REMOVED***);
***REMOVED***

function writeFile(path, data) ***REMOVED***
	return new Promise((resolve, reject) => ***REMOVED***
		var pathFragment = path.split('/');
		pathFragment.pop();
		var directory = pathFragment.join('/');
		mkdirp(directory, err => err ? reject(err) : resolve(true));
	***REMOVED***).then(() => ***REMOVED***
		return new Promise((resolve, reject) => ***REMOVED***
			fs.writeFile(path, data, err => err ? reject(err) : resolve(true));
		***REMOVED***);
	***REMOVED***);
***REMOVED***

module.exports = ***REMOVED***
	glob: globFunc,
	readDir: readDir,
	readFile: readFile,
	writeFile: writeFile
***REMOVED***;