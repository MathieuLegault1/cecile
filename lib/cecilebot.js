require('dotenv').config()
var Bot = require('slackbots')

// create a bot
var settings = {
  token: process.env.SLACK_TOKEN,
  name: process.env.BOT_NAME
};
var bot = new Bot(settings)

bot.on('start', function() {});

bot.on('message', function(data) {
  var parsedMessage = parseMessage(data)
  if (parsedMessage != null) {
    bot.postMessage(parsedMessage.channel, "Désolé, je ne comprends pas ta commande. Nic aide moi !!")
  }
});

function parseMessage(data) {
  if (data.type != "message" || data.subtype == "bot_message") {
    return null
  }

  return {
    channel: data.channel,
    text: data.text
  }
}
