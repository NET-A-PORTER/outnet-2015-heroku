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
      var fileName = file;
      return utils.readFile(directory + '/' + file, { encoding: null })
        .then(function(data) {
          var parts = [];
          if (options.version) parts.push(options.version);
          if (options.hash) parts.push(utils.checksum(data));
          fileName = utils.addToFileName(fileName, parts);
          console.log('Uploading ' + fileName + '.');
          return publisher.upload(fileName, data, options);
        })
        .catch(function(err) {
          console.error('Failed to upload ' + fileName + '.', err);
        });
    })
  );
}

module.exports = Publish;
