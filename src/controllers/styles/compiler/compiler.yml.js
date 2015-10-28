var hbs		= require('handlebars');
var etc   = require('etc');
var yml   = require('etc-yaml');
var compiler = etc().use(yml);

function YamlCompiler() ***REMOVED***

  return function * (directory, file) ***REMOVED***
    var path = directory + '/' + file;
    var result = etc().use(yml).file(path).toJSON();
    var markup = hbs
        .Utils
        .escapeExpression(result.markup)
        .replace(/(\r\n|\n|\r)/gm, '<br>')
        .replace(/(\t)/gm, '&nbsp;&nbsp;');
    return ***REMOVED***
      title: result.title,
      detail: result.detail,
      markup: markup
***REMOVED***;
***REMOVED***;

***REMOVED***

module.exports = YamlCompiler;
