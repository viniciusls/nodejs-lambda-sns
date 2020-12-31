const aws = require('aws-sdk');
const Telegram = require('telegraf/telegram');

class TelegramClient {
  constructor() {
    this.telegram = new Telegram(process.env.TELEGRAM_BOT_TOKEN_ID);;
  }

  async publish(message, targetChat, callback) {
    // Call telegram bot to send message alerting that the application is down!
    this.telegram.sendMessage(targetChat, message)
      .then(() => {
        console.log(`Message ${message} sent to Telegram Bot`);

        callback(null, `Message ${message} sent to Telegram Bot`);
      })
      .catch((err) => {
        console.log(`Message ${message} NOT sent to Telegram Bot. Error: ${err}`);

        callback(new Error(`Error on sending message! Message: ${message}`));
      });
  }
}

module.exports = { TelegramClient };
