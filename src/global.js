global.base = {
	require: (path) => {
		return require(this.path(path));
	},
	path: (path) => {
		return __dirname + '/' + path;
	}
};