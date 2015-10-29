var hbs		= require('handlebars');
var etc   = require('etc');
var yml   = require('etc-yaml');
var compiler = etc().use(yml);

function DocumentCompiler() ***REMOVED***

  return function * (directory, file) ***REMOVED***
    var path = directory + '/' + file;
    var result = etc().use(yml).file(path).toJSON();
    return result.document.map((section) => ***REMOVED***
      var markup = hbs
          .Utils
          .escapeExpression(section.markup)
          .replace(/(\r\n|\n|\r)/gm, '<br>')
          .replace(/(\t)/gm, '&nbsp;&nbsp;');
      return ***REMOVED***
        title: section.title,
        detail: section.detail,
        markup: section.markup,
        markupEscaped: markup
  ***REMOVED***
***REMOVED***);
***REMOVED***;

***REMOVED***

module.exports = DocumentCompiler;
