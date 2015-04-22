var Styles		= require('./styles');
var styleDir	= base.path('styles');
var styles		= null;

function * list() {
	try {
		// assign styles for caching
		styles = styles || new Styles(styleDir);
		this.body = yield styles.getAll();
	} catch(e) {
		this.status = 500;
		this.body = {
			message: 'There was an error retrieving styles'
		};
	}
}

module.exports = {
	list: list
};