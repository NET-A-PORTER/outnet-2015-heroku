var Styles		= require('./styles');
var styleDir	= base.path('styles')
var styles		= null;

function * list() {
	styles = styles || new Styles(styleDir);
	if (styles) {
		this.body = yield styles.getAll();
	} else {
		this.status = 500;
		this.body = {
			message: 'There was an error retrieving styles'
		};
	}
}

module.exports = {
	list: list
};