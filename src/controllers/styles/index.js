var Styles		= require('./styles');
var styleDir	= base.path('styles');
var styles		= null;

function * list() ***REMOVED***
	try ***REMOVED***
		// assign styles for caching
		styles = styles || new Styles(styleDir);
		this.body = yield styles.getAll();
	***REMOVED*** catch(e) ***REMOVED***
		this.status = 500;
		this.body = ***REMOVED***
			message: 'There was an error retrieving styles'
		***REMOVED***;
	***REMOVED***
***REMOVED***

module.exports = ***REMOVED***
	list: list
***REMOVED***;