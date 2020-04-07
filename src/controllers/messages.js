const payloads = require("../helpers/payloads");
const { postRequestAPI } = require('../helpers/api');

/**
 *
 * Functions that handles all the messages that are posted to slack api.
 *
 */

const sendMessage = async (user, channel) => {
  let text = `<@${user}>, skickade ett meddelande :thumbsup:`;
  await postRequestAPI("chat.postMessage", { user, channel, text });
};

const welcomeMessage = async (user) => {
  let channel = await postRequestAPI('im.open', { user: user.id });

  let message = payloads.welcomeMessage();
  message.channel = channel.channel.id

  await postRequestAPI('chat.postMessage', message);
};

const appMentionMessage = async (user, channel) => {
  let text = `Hej <@${user}>, du pingade mig :tada: Skriv /info för mer information om vad jag kan göra.`;
  await postRequestAPI("chat.postEphemeral", { user, channel, text });
};
module.exports = { appMentionMessage, sendMessage, welcomeMessage };
