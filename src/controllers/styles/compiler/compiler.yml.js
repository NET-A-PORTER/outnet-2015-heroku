var hbs		= require('handlebars');
var etc   = require('etc');
var yml   = require('etc-yaml');
var compiler = etc().use(yml);

function YamlCompiler() {

  return function * (directory, file) {
    var path = directory + '/' + file;
    var result = etc().use(yml).file(path).toJSON();
    var markup = hbs
        .Utils
        .escapeExpression(result.markup)
        .replace(/(\r\n|\n|\r)/gm, '<br>')
        .replace(/(\t)/gm, '&nbsp;&nbsp;');
    return {
      title: result.title,
      detail: result.detail,
      markup: markup
    };
  };

}

module.exports = YamlCompiler;
