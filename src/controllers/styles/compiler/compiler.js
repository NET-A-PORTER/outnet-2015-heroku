function Compiler() {
	this.processors = {};
}

Compiler.prototype = {
	add: (type) => {
		var tasks = Array.prototype.slice.call(arguments, 1);
		this.processors[type] = tasks;
	},
	process: function * (directory, files) {
		var processed = {};
		for (var i in files) {
			var file = files[i];

			// NOTE: matching against file extension
			// NOTE: matching could be made to use glob patterns instead
			var ext = file.split('.').pop();
			var tasks = this.processors[ext];
			if (tasks) {
				// process each task and pass result
				// onto next function through body object
				var result = '';
				for (var i in tasks) {
					var task = tasks[i];
					result = yield task.call({ body: result }, directory, file);
				}
				processed[file] = result;
			}
		}
		return processed;
	}
};


module.exports = Compiler;