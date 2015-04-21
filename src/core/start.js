var app		= base.require('server');
var port	= process.env.PORT || 7000;

app.listen(port);
console.log('OMG! App started on port', port);
