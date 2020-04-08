const payloads = require("../helpers/payloads");
const { postRequest } = require("./api");

/**
 *
 * Functions that handles all the messages that are posted to slack api.
 *
 */

const sendMessage = async (user) => {
  let channelData = await postRequest("im.open", { user });
  console.log(channelData);
  let message = payloads.welcomeMessage({
    welcomeText: "Mitt namn är IBM-boten och min uppgift är att lista användbara kommandon och ge information om våra medarbetare."
  });
  message.channel = channelData.channel.id;

  await postRequest("chat.postMessage", message);
};

const welcomeMessage = async (user) => {
  let channel = await postRequest("im.open", { user: user.id });

  let message = payloads.welcomeMessage({welcomeText: "Hallå där och varmt välkommen till teamet :tada: \n Mitt namn är IBM-boten och min uppgift är att lista användbara kommandon och ge information om våra medarbetare."});
  message.channel = channel.channel.id;

  await postRequest("chat.postMessage", message);
};

const appMentionMessage = async (user, channel) => {
  let text = `Hej <@${user}>, du pingade mig :tada: Skriv /info för mer information om vad jag kan göra.`;
  await postRequest("chat.postEphemeral", { user, channel, text });
};
module.exports = { appMentionMessage, sendMessage, welcomeMessage };
