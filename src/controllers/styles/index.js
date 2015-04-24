var Style		= require('./style');
var Styles		= require('./styles');
var Content		= require('./content');
var styleDir	= base.path('styles');
var styles		= null;

function * list() {
	try {
		// assign styles for caching
		styles = styles || new Styles(styleDir);
		this.body = yield styles.getAll();
	} catch(e) {
		console.log(e);
		this.status = 500;
		this.body = {
			message: 'Error retrieving styles'
		};
	}
}

function * get() {
	try {
		var styleName = this.params.style;
		var style = new Style(styleName, styleDir);
		this.body = yield style.getDefinition();
	} catch(e) {
		console.log(e);
		this.status = 500;
		this.body = {
			message: 'Error retrieving style ' + styleName
		};
	}
}

function * getContents() {
	try {
		var styleName = this.params.style;
		var contentName = this.params.content;
		var baseDir = styleDir + '/' + styleName + '/' + contentName;
		var content = yield new Content(baseDir);
		this.body = content.toJSON();
	} catch(e) {
		console.log(e);
		this.status = 500;
		this.body = {
			message: 'Error retrieving ' + contentName + ' contents'
		};
	}
}

module.exports = {
	get: get,
	getContents: getContents,
	list: list
};