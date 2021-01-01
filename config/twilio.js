class TwilioClient {
  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    this.twilio = require('twilio')(accountSid, authToken);
  }

  async publish(message, targetNumber, callback) {
    this.twilio.messages
      .create({
        to: targetNumber,
        from: process.env.SOURCE_NUMBER,
        body: message,
      })
      .then(messageSent => {
        console.log(`Message ${message} sent to Twilio SMS. Msg ID: ${messageSent.sid}`);

        callback(null, `Message ${message} sent to Twilio SMS`);
      }).catch((err) => {
        console.log(`Message ${message} NOT sent to Twilio SMS. Error: ${err}`);

        callback(new Error(`Error on sending message! Message: ${message}`));
      });
  }
}

module.exports = { TwilioClient };
