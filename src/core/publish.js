var utils = base.require('core/utils');
var config = base.require('core/config');
var Publisher = require('out-publish');

var publisher = new Publisher(***REMOVED***
  accessKeyId:      config.get('aws.s3.accessKeyID'),
  secretAccessKey:  config.get('aws.s3.secretAccessKey'),
  bucket:           config.get('aws.s3.bucket'),
  region:           config.get('aws.s3.region'),
  timeout: 			    config.get('aws.s3.timeout')
***REMOVED***);

function Publish(directory, files) ***REMOVED***
  return Promise.all(
    files.map( (file) => ***REMOVED***
      return utils.readFile(directory + '/' + file)
        .then(function(data) ***REMOVED***
          publisher.upload(file, data);
          console.log('Uploaded ' + file + '.');
    ***REMOVED***)
        .catch(function(err) ***REMOVED***
          console.error('Failed to upload ' + file + '.');
    ***REMOVED***);
***REMOVED***)
  );
***REMOVED***

module.exports = Publish;
