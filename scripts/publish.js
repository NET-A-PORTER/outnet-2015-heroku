#!/usr/bin/env node --harmony

require('../src/global');

var cli = require('commander');
var publish = base.require('core/publish');

cli
  .usage('<file...>')
  .parse(process.argv)

var buildDir = 'build';

var files = cli.args.map(function(arg) ***REMOVED***
  if(arg.indexOf(buildDir + '/') !== -1)
    return arg.replace(buildDir + '/', '');
***REMOVED***);

publish(buildDir, files)
  .then(function() ***REMOVED***
    console.log('Published', files);
***REMOVED***)
  .catch(function(error) ***REMOVED***
    console.error('Failed to publish. Error:', error);
***REMOVED***);;
