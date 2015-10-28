var fs		= require('fs');
var glob 	= require('glob');
var mkdirp	= require('mkdirp');

function globFunc(pattern, options) {
	return new Promise((resolve, reject) => {
		glob(pattern, options, (err, files) => {
			if (err) return reject(err);
			resolve(files);
		});
	});
}

function readDir(path, filter) {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {
			if (err) return reject(err);
			resolve(files);
		});
	});
}

function readFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, { encoding: 'utf-8' }, (err, contents) => {
			if (err) return reject(err);
			resolve(contents);
		});
	});
}

function writeFile(path, data) {
	return new Promise((resolve, reject) => {
		var pathFragment = path.split('/');
		pathFragment.pop();
		var directory = pathFragment.join('/');
		mkdirp(directory, err => err ? reject(err) : resolve(true));
	}).then(() => {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, err => err ? reject(err) : resolve(true));
		});
	});
}

function yield(gen) {
  var it = gen();

  (function iterate(val){
    var nextGen = it.next( val );
    if (!nextGen.done) {
      if ("then" in nextGen.value) {
        nextGen.value.then( iterate );
      } else {
        setTimeout( function(){
          iterate( nextGen.value );
        }, 0 );
      }
    }
  })();
}

module.exports = {
	glob: globFunc,
	readDir: readDir,
	readFile: readFile,
	writeFile: writeFile,
  yield: yield
};
