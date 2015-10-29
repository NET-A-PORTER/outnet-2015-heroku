var hbs		= require('handlebars');
var etc   = require('etc');
var yml   = require('etc-yaml');
var compiler = etc().use(yml);

function DocumentCompiler() ***REMOVED***

  return function * (directory, file) ***REMOVED***
    var path = directory + '/' + file;
    var result = etc().use(yml).file(path).toJSON();
    return result.document.map((section) => ***REMOVED***
      var markupEscaped = hbs.Utils.escapeExpression(section.markup);
      return ***REMOVED***
        title: section.title,
        detail: section.detail,
        markup: section.markup,
        markupEscaped: markupEscaped
  ***REMOVED***
***REMOVED***);
***REMOVED***;

***REMOVED***

module.exports = DocumentCompiler;
