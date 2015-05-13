function Compiler() {
	this.processors = [];
}

Compiler.prototype = {
	add: (pattern) => {
		var tasks = Array.prototype.slice.call(arguments, 1);
		this.processors.push({
			pattern: new RegExp(pattern, 'ig'),
			tasks: tasks
		});
	},
	process: function * (directory, files) {
		var processed = {};

		// loop through all files
		for (var fileIndex in files) {
			var file = files[fileIndex];

			// loop through all processes
			for (var processIndex in this.processors) {
				var process = this.processors[processIndex];

				// test if filename matches any process
				if (process.pattern.test(file)) {

					// NOTE: should really use a reduce function im here

					// use result of previous process on same file
					// or start the result/input as a blank string,
					var result = processed[file] || '';

					// process each task and pass result
					// onto next function through body object
					for (var taskIndex in process.tasks) {
						result = yield process.tasks[taskIndex].call({ body: result }, directory, file);
					}
					processed[file] = result;
				}
			}
		}
		return processed;
	}
};


module.exports = Compiler;