var utils = base.require('core/utils');
var config = base.require('core/config');
var Publisher = require('out-publish');

var publisher = new Publisher({
  accessKeyId:      config.get('aws.s3.accessKeyID'),
  secretAccessKey:  config.get('aws.s3.secretAccessKey'),
  bucket:           config.get('aws.s3.bucket'),
  region:           config.get('aws.s3.region'),
  timeout: 			    config.get('aws.s3.timeout')
});

function Publish(directory, files, options) {
  return Promise.all(
    files.map( (file) => {
      return utils.readFile(directory + '/' + file, { encoding: null })
        .then(function(data) {
          return publisher.upload(file, data, options);
          console.log('Uploaded ' + file + '.');
        })
        .catch(function(err) {
          console.error('Failed to upload ' + file + '.');
        });
    })
  );
}

module.exports = Publish;
