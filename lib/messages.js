const files = require('./files');

module.exports.getAll = async () => {
  const s3opts = {
    Bucket: process.env.AWS_S3_BUCKET,
  };

  let objectsList;

  for await (const data of files.getAll(s3opts)) {
    objectsList = data.Contents;
  }

  const objectsKeyList = objectsList.map(e => e.Key).sort();

  const messages = [];

  for (const objectKey of objectsKeyList) {
    const object = await files.getObject(Object.assign({Key: objectKey}, s3opts));

    const body = object.Body.toString('utf-8');
    const message = body.split('\n');

    messages.push(message);
  }

  return messages;
};
