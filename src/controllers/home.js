var config = base.require('core/config');
var build = require('./styles').build;

function * render() {
  if(config.get('env') == 'local')
    yield * build();
	yield this.render('home');
}

module.exports = {
	render: render
};
