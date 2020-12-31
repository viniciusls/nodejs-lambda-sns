const s3 = require('../config/s3')();

async function* getAll(opts) {
  opts = { ...opts };
  do {
    const data = await s3.listObjectsV2(opts).promise();
    opts.ContinuationToken = data.NextContinuationToken;
    yield data;
  } while (opts.ContinuationToken);
}

async function getObject(opts) {
  return s3.getObject(opts).promise();
}

module.exports = { getAll, getObject };
