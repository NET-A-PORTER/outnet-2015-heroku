var app			= base.require('server');
var controller	= base.require('controllers/styles');

app.get('/api/1.0/styles', controller.list);
app.get('/api/1.0/styles/:style', controller.get);
app.get('/api/1.0/styles/:style/:content', controller.getContents);