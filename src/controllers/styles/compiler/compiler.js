module.exports = {
	processors: [],
	add: function(pattern) {
		var tasks = [].slice.call(arguments, 1);
		this.processors.push({
			pattern: pattern,
			tasks: tasks
		});
	},
	process: function * (directory, files, baseDir) {
		var processed = {};

		// loop through all files
		for (var fileIndex in files) {
			var file = files[fileIndex];

			// loop through all processes
			for (var processIndex in this.processors) {
				var process = this.processors[processIndex];

				// Regex internal pointer for global pattern must be reset when looped
				// http://stackoverflow.com/questions/6739136/consecutive-calls-to-regexp-test-fail-for-pattern-with-global-option
				process.pattern.lastIndex = 0;

				// test if filename matches any process
				if (process.pattern.test(file)) {

					// NOTE: should really use a reduce function im here

					// use result of previous process on same file
					// or start the result/input as a blank string,
					var result = processed[file] || '';

					// process each task and pass result
					// onto next function through body object
					for (var taskIndex in process.tasks) {
						result = yield * process.tasks[taskIndex].call({ body: result }, directory, file, baseDir);
					}
					processed[file] = result;
				}
			}
		}
		return processed;
	}
};
