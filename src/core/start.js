var app		= base.require('server');
var port	= process.env.PORT || 7000;

var build = base.require('controllers/styles').build;
var yield = base.require('core/utils').yield;

yield(build);

app.listen(port);
console.log('OMG! App started on port', port);
