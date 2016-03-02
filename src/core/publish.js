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

function Publish(directory, files) {
  return Promise.all(
    files.map( (file) => {
      utils.readFile(directory + '/' + file)
        .then(function(data) {
          publisher.upload(file, data);
        });
    })
  );
}

module.exports = Publish;
