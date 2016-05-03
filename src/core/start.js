var app		= base.require('server');
var port	= process.env.PORT || 7000;

var build = base.require('controllers/styles').build;
var yield = require('co');

yield(build)
  .catch(function(err) {
    console.error('Failed to build. Error:', err);
    process.exit(1);
  });

app.listen(port);
console.log('OMG! App started on port', port);
