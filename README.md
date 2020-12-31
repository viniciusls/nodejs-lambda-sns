# nodejs-lambda-sns
A Lambda application to send SMS using Amazon SNS and/or Telegram

## How to use it
1) Run `npm install`.
2) Create a `.env` file or add the following environment variables to your configuration:
```
AWS_S3_BUCKET=<S3 Bucket name where the message files (.txt) are stored>
TARGET_NUMBER=<SMS target number>

TELEGRAM_ENABLED=<true/false>
TELEGRAM_BOT_TOKEN_ID=<Telegram Bot ID>
TELEGRAM_CHAT_ID=<Telegram Chat ID>

AWS_SNS_ENABLED=<true/false>
AWS_ACCESS_KEY_ID=<Amazon AWS Access Key with permissions on S3 and SNS>
AWS_SECRET_ACCESS_KEY=<Amazon AWS Secret Key>
AWS_SESSION_TOKEN=
```
3) Upload the `.txt` files containing the messages that are going to be published (each line will be a new message).
4) Run `node app.js`.
