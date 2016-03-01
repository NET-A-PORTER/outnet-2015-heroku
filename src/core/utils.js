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

function readFile(path, options) ***REMOVED***
  options = options || ***REMOVED*** encoding: 'utf-8' ***REMOVED***;
	return new Promise((resolve, reject) => ***REMOVED***
		fs.readFile(path, options, (err, contents) => ***REMOVED***
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

function yield(gen) ***REMOVED***
  var it = gen();
  var value;

  return (function iterate(val)***REMOVED***
    var nextGen = it.next( val );
    if (!nextGen.done) ***REMOVED***
      value = nextGen.value;
      if ("then" in value) ***REMOVED***
        value.then( iterate );
  ***REMOVED*** else ***REMOVED***
        setTimeout( function()***REMOVED***
          iterate( value );
    ***REMOVED***, 0 );
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      return value;
***REMOVED***
***REMOVED***)();
***REMOVED***

module.exports = ***REMOVED***
	glob: globFunc,
	readDir: readDir,
	readFile: readFile,
	writeFile: writeFile,
  yield: yield
***REMOVED***;
