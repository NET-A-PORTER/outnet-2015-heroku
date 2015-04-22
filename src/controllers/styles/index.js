var Style		= require('./style');
var Styles		= require('./styles');
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
		var name = this.params.name;
		var style = new Style(name, styleDir);
		this.body = yield style.getDefinition();
	} catch(e) {
		console.log(e);
		this.status = 500;
		this.body = {
			message: 'Error retrieving style ' + name
		};
	}
}

module.exports = {
	get: get,
	list: list
};