require('../src/global');
var utils = base.require('core/utils');
var SassCompiler = base.require('controllers/styles/compiler/compiler.sass');

var sass = new SassCompiler();

utils.yield(function * main() {
  var css = (yield * sass('src/styles/outnet-2015', 'styles.scss')).compiled;
  yield utils.writeFile('build/style.css', css);
  console.log('Generated build/style.css');
});

