var Styles		= require('./styles');
var styleDir	= base.path('styles')
var styles		= null;

function * list() ***REMOVED***
	styles = styles || new Styles(styleDir);
	if (styles) ***REMOVED***
		this.body = yield styles.getAll();
	***REMOVED*** else ***REMOVED***
		this.status = 500;
		this.body = ***REMOVED***
			message: 'There was an error retrieving styles'
		***REMOVED***;
	***REMOVED***
***REMOVED***

module.exports = ***REMOVED***
	list: list
***REMOVED***;