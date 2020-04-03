const payloads = require("../helpers/payloads");
const { postRequestAPI } = require('../helpers/api');

/**
 *
 * Functions that handles all the messages that are posted to slack api.
 *
 */

const sendMessage = async (req, res) => {
  try {
    let message = `<@${req.body.event.user}>, skickade ett meddelande :thumbsup:`;

    let result = await postRequestAPI("chat.postEphemeral", {
      user: req.body.event.user,
      channel: req.body.event.channel,
      text: message
    });

    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};

const welcomeMessage = async (req, res) => {
  try {

    let channel = await postRequestAPI('im.open', {
      user: req.body.event.user.id
    })

    let message = payloads.welcomeMessage({
      channel: channel.channel.id
    });

    let result = await postRequestAPI('chat.postMessage', message);
    res.status(200);

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

const appMentionMessage = async (req, res) => {
  try {
    let result = await postRequestAPI("chat.postEphemeral", {
      user: req.body.event.user,
      channel: req.body.event.channel,
      text: `Hej <@${req.body.event.user}>, du pingade mig :tada: Skriv /info för mer information om vad jag kan göra.`
    });

    res.status(200).end();
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};
module.exports = { appMentionMessage, sendMessage, welcomeMessage };
