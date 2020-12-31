const aws = require('aws-sdk');

class SNSClient {
  constructor() {
    aws.config.region = 'us-east-1';

    this.sns = new aws.SNS();
  }

  async publish(message, targetNumber) {
    const params = {
      Message: message,
      MessageStructure: 'string',
      PhoneNumber: targetNumber
    };

    console.log(`Message ${message} sent to AWS SNS`);

    this.sns.publish(params, (err, data) => {
      if (err) console.error(err);
      else console.log(data);
    });
  }
}

module.exports = { SNSClient };
