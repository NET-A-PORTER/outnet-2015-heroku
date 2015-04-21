var app			= base.require('server');
var controller	= base.require('controllers/home');

app.get('/', controller.render);