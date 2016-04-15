var hbs		= require('handlebars');
var etc   = require('etc');
var yml   = require('etc-yaml');
var compiler = etc().use(yml);

function DocumentCompiler() {

  return function * (directory, file) {
    var path = directory + '/' + file;
    var result = etc().use(yml).file(path).toJSON();
    return result.document.map((section) => {
      var markupEscaped = hbs.Utils.escapeExpression(section.markup);
      return {
        title: section.title,
        detail: section.detail,
        markup: section.markup,
        markupEscaped: markupEscaped,
        disabled: section.disable
      }
    });
  };

}

module.exports = DocumentCompiler;
