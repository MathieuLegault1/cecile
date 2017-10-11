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
  var parsedMessage = processMessage(data)
  if (parsedMessage != null) {
    var command = parseCommand(data.text)
    if (command == null) {
      bot.postMessage(parsedMessage.channel, "Désolé, je ne comprends pas ta commande. Voici le format: `A1 C3 A2;B1 B4`")
    } else {
      bot.postMessage(parsedMessage.channel, "Merci d'avoir fait vos choix!")
    }
  }
});

function processMessage(data) {
  if (data.type != "message" || data.subtype == "bot_message") {
    return null
  }
  //console.log(data)
  return {
    channel: data.channel,
    text: data.text
  }
}

function parseCommand(message) {
  return null
}
