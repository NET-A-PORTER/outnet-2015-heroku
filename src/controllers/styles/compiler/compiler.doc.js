var hbs		= require('handlebars');
var etc   = require('etc');
var yml   = require('etc-yaml');
var compiler = etc().use(yml);

function DocumentCompiler() {

  return function * (directory, file) {
    var path = directory + '/' + file;
    var result = etc().use(yml).file(path).toJSON();
    return result.document.map((section) => {
      var markup = hbs
          .Utils
          .escapeExpression(section.markup)
          .replace(/(\r\n|\n|\r)/gm, '<br>')
          .replace(/(\t)/gm, '&nbsp;&nbsp;');
      return {
        title: section.title,
        detail: section.detail,
        markup: section.markup,
        markupEscaped: markup
      }
    });
  };

}

module.exports = DocumentCompiler;
