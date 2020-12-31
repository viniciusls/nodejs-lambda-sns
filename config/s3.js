const aws = require('aws-sdk');

const s3Client = () => {
  aws.config.region = 'us-east-1';

  return new aws.S3();
};

module.exports = s3Client;
