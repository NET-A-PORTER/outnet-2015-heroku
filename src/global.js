global.base = {
	require: function (path) {
		return require(this.path(path));
	},
	path: function(path) {
		return __dirname + '/' + path;
	}
};
