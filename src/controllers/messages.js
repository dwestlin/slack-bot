const payloads = require("../helpers/payloads");
const { postRequest } = require("./api");

/**
 *
 * Functions that handles all the messages that are posted to slack api.
 *
 */
const sendMessage = async (user) => {
  let channel = await postRequest("im.open", { user });

  let message = payloads.welcomeMessage();
  message.channel = channel.channel.id;

  await postRequest("chat.postMessage", message);
};

const appMentionMessage = async (user, channel) => {
  let text = `Hej <@${user}>, du pingade mig :tada: Skriv /info för mer information om vad jag kan göra.`;
  await postRequest("chat.postEphemeral", { user, channel, text });
};

module.exports = { appMentionMessage, sendMessage };
