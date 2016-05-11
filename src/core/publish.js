var utils = base.require('core/utils');
var config = base.require('core/config');
var Publisher = require('out-publish');

var publisher = new Publisher({
  accessKeyId:      config.get('aws.s3.accessKeyID'),
  secretAccessKey:  config.get('aws.s3.secretAccessKey'),
  bucket:           config.get('aws.s3.bucket'),
  region:           config.get('aws.s3.region'),
  timeout: 			    config.get('aws.s3.timeout'),
  cache:   			    config.get('aws.s3.cacheControl'),
});

var version;

function Publish(directory, files, options) {
  var options = options || {};
  return Promise.all(
    files.map( (file) => {
      var fileName = version ? version + '/' + file : file;
      return utils.readFile(directory + '/' + file, { encoding: null })
        .then(function(data) {
          console.log('Uploading ' + fileName + '.');
          return publisher.upload(fileName, data, options);
        })
        .catch(function(err) {
          console.error('Failed to upload ' + fileName + '.', err);
        });
    })
  );
}

module.exports = {
  publish: Publish,
  setVersion: function(ver) {
    version = ver;
  }
};
