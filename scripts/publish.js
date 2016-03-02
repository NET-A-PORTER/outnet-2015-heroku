#!/usr/bin/env node --harmony

require('../src/global');

var cli = require('commander');
var publish = base.require('core/publish');

cli
  .usage('<file...>')
  .parse(process.argv)

var buildDir = 'build';

var files = cli.args.map(function(arg) {
  if(arg.indexOf(buildDir + '/') !== -1)
    return arg.replace(buildDir + '/', '');
});

publish(buildDir, files)
  .then(function() {
    console.log('Published', files);
  })
  .catch(function(error) {
    console.error('Failed to publish. Error:', error);
  });;
