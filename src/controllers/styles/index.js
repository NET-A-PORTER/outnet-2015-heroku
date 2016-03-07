var Style		= require('./style');
var Styles		= require('./styles');
var styleDir	= base.path('styles');
var styles		= null;

function response(error, name) {
	console.log(error);

	var message = 'Error retrieving ' + name;
	var status = 500;
	if (error.errno === -2) {
		status = 404;
		message = name + ' not found';
	}

	this.status = status;
	this.body = { message: message };
}

function * list() {
	try {
		// assign styles for caching
		styles = styles || new Styles(styleDir);
		this.body = yield styles.getAll();
	} catch(e) {
		response.call(this, e, 'styles');
	}
}

function * get() {
	try {
		var styleName = this.params.style;
		var style = new Style(styleName, styleDir);
		this.body = yield style.getDefinition();
	} catch(e) {
		response.call(this, e, styleName);
	}
}

function * getElement() {
	try {
		var elementName = this.params.element;
		var styleName = this.params.style;
		var style = new Style(styleName, styleDir);
		this.body = yield style.getElement({dir: elementName});
	} catch(e) {
		response.call(this, e, elementName);
	}
}

module.exports = {
	get: get,
	getElement: getElement,
	list: list
};
