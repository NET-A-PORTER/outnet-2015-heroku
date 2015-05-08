function Compiler() ***REMOVED***
	this.processors = ***REMOVED******REMOVED***;
***REMOVED***

Compiler.prototype = ***REMOVED***
	add: (type) => ***REMOVED***
		var tasks = Array.prototype.slice.call(arguments, 1);
		this.processors[type] = tasks;
	***REMOVED***,
	process: function * (directory, files) ***REMOVED***
		var processed = ***REMOVED******REMOVED***;
		for (var i in files) ***REMOVED***
			var file = files[i];

			// NOTE: matching against file extension
			// NOTE: matching could be made to use glob patterns instead
			var ext = file.split('.').pop();
			var tasks = this.processors[ext];
			if (tasks) ***REMOVED***
				// process each task and pass result
				// onto next function through body object
				var result = '';
				for (var i in tasks) ***REMOVED***
					var task = tasks[i];
					result = yield task.call(***REMOVED*** body: result ***REMOVED***, directory, file);
				***REMOVED***
				processed[file] = result;
			***REMOVED***
		***REMOVED***
		return processed;
	***REMOVED***
***REMOVED***;


module.exports = Compiler;