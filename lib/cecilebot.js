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
      askDeliveryDays(parsedMessage.channel)
        //askHowManyDelivery(parsedMessage.channel)
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

function askDeliveryDays(channelId) {
  var param = {
    "attachments": [{
      "text": "Jours avec lunch:",
      "fallback": "Impossible d'afficher la question",
      "callback_id": "admin_days_list",
      "color": "#3AA3E3",
      "attachment_type": "default",
      "actions": [{
        "name": "monday",
        "text": "Lundi :white_check_mark:",
        "type": "button",
        "style": "primary"
      }, {
        "name": "tuesday",
        "text": "Mardi :white_check_mark:",
        "type": "button",
        "style": "primary"
      }, {
        "name": "wednesday",
        "text": "Mercredi :white_check_mark:",
        "type": "button",
        "style": "primary"
      }, {
        "name": "thursday",
        "text": "Jeudi :white_check_mark:",
        "type": "button",
        "style": "primary"
      }, {
        "name": "friday",
        "text": "Vendredi",
        "type": "button",
        "style": "danger"
      }]
    }, {
      "text": "Terminez?",
      "fallback": "Impossible d'afficher la question",
      "callback_id": "admin_full_week",
      "color": "#3AA3E3",
      "attachment_type": "default",
      "actions": [{
        "name": "yes",
        "text": "Oui",
        "type": "button"
      }]
    }]
  }
  bot.postMessage(channelId, "", param)
}

function askHowManyDelivery(channelId) {
  var param = {
    "attachments": [{
      "text": "Combien de livraison cette semaine?",
      "fallback": "Impossible d'afficher la question",
      "callback_id": "admin_how_many_delivery",
      "color": "#3AA3E3",
      "attachment_type": "default",
      "actions": [{
        "name": "one",
        "text": "1",
        "type": "button"
      }, {
        "name": "tow",
        "text": "2",
        "type": "button"
      }, {
        "name": "three",
        "text": "3",
        "type": "button"
      }, {
        "name": "four",
        "text": "4",
        "type": "button"
      }, {
        "name": "five",
        "text": "5",
        "type": "button"
      }]
    }]
  }
  bot.postMessage(channelId, "", param)
}
