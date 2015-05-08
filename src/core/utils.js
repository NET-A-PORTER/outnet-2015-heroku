var fs		= require('fs');
var mkdirp	= require('mkdirp');

function readDir(path) {
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

module.exports = {
	readDir: readDir,
	readFile: readFile,
	writeFile: writeFile
};