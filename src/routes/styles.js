var app			= base.require('server');
var controller	= base.require('controllers/styles');

app.get('/api/1.0/styles', controller.list);