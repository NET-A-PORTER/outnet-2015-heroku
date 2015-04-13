var app		= base.require('server');
var port	= process.env.PORT || 5000;

app.listen(port);
console.log('OMG! App started on port', port);