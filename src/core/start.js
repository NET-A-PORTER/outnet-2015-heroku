var app		= base.require('server');
var port	= process.env.PORT || 7000;

var Styles = base.require('controllers/styles/styles');
var Style = base.require('controllers/styles/style');

var yield = base.require('core/utils').yield;


yield(function * main() {
  var styleDir	= base.path('styles');
  var styles = new Styles(styleDir);
  var list = yield * styles.getAll();
  for (styleDetails of list) {
    var style = new Style(styleDetails.name, styleDir);
    for (elementName of (yield style.getDefinition()).elements) {
      yield * style.getElement(elementName);
    }
  }
});

app.listen(port);
console.log('OMG! App started on port', port);
