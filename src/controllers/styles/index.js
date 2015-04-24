var Style		= require('./style');
var Styles		= require('./styles');
var Content		= require('./content');
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
		var styleName = this.params.style;
		var style = new Style(styleName, styleDir);
		this.body = yield style.getDefinition();
	***REMOVED*** catch(e) ***REMOVED***
		console.log(e);
		this.status = 500;
		this.body = ***REMOVED***
			message: 'Error retrieving style ' + styleName
		***REMOVED***;
	***REMOVED***
***REMOVED***

function * getContents() ***REMOVED***
	try ***REMOVED***
		var styleName = this.params.style;
		var contentName = this.params.content;
		var baseDir = styleDir + '/' + styleName + '/' + contentName;
		var content = yield new Content(baseDir);
		this.body = content.toJSON();
	***REMOVED*** catch(e) ***REMOVED***
		console.log(e);
		this.status = 500;
		this.body = ***REMOVED***
			message: 'Error retrieving ' + contentName + ' contents'
		***REMOVED***;
	***REMOVED***
***REMOVED***

module.exports = ***REMOVED***
	get: get,
	getContents: getContents,
	list: list
***REMOVED***;