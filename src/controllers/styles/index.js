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
		this.body = yield style.getElement(elementName);
	} catch(e) {
		response.call(this, e, elementName);
	}
}

function * build(styles) {
  var styleDir	= base.path('styles');
  var list = styles ? styles : yield * new Styles(styleDir).getAll();
  for (styleDetails of list) {
    var style = new Style(styleDetails.name, styleDir);
    yield * style.build();
    for (elementName of (yield style.getDefinition()).elements) {
      yield * style.getElement(elementName);
    }
  }
}

module.exports = {
	get: get,
	getElement: getElement,
	list: list,
  build: build
};
