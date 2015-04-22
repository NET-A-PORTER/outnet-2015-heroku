var Style		= require('./style');
var Styles		= require('./styles');
var styleDir	= base.path('styles');
var styles		= null;

function * list() ***REMOVED***
	try ***REMOVED***
		// assign styles for caching
		styles = styles || new Styles(styleDir);
		this.body = yield styles.getAll();
	***REMOVED*** catch(e) ***REMOVED***
		console.log(e);
		this.status = 500;
		this.body = ***REMOVED***
			message: 'Error retrieving styles'
		***REMOVED***;
	***REMOVED***
***REMOVED***

function * get() ***REMOVED***
	try ***REMOVED***
		var name = this.params.name;
		var style = new Style(name, styleDir);
		this.body = yield style.getDefinition();
	***REMOVED*** catch(e) ***REMOVED***
		console.log(e);
		this.status = 500;
		this.body = ***REMOVED***
			message: 'Error retrieving style ' + name
		***REMOVED***;
	***REMOVED***
***REMOVED***

module.exports = ***REMOVED***
	get: get,
	list: list
***REMOVED***;