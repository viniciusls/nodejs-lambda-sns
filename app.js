require('dotenv').config({
  silent: true
});

const { SNSClient } = require('./config/sns');
const { TelegramClient } = require('./config/telegram');
const { TwilioClient } = require('./config/twilio');
const messages = require('./lib/messages');

async function main() {
  const snsClient = new SNSClient();
  const telegramClient = new TelegramClient();
  const twilioClient = new TwilioClient();
  const messagesList = await messages.getAll();
  const targetNumber = process.env.TARGET_NUMBER;
  const targetChat = process.env.TELEGRAM_CHAT_ID;

  for (const message of messagesList) {
    for (const messageLine of message) {
      if (process.env.AWS_SNS_ENABLED === "true") {
        await snsClient.publish(messageLine, targetNumber);
      }

      if (process.env.TWILIO_ENABLED === "true") {
        await twilioClient.publish(messageLine, targetNumber, () => {});
      }

      if (process.env.TELEGRAM_ENABLED === "true") {
        await telegramClient.publish(messageLine, targetChat, () => {});
      }

      await sleep(3000);
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main();

