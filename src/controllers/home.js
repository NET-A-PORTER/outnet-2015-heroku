function * render() {
	yield this.render('home');
}

module.exports = {
	render: render
};