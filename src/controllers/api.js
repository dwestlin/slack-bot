const axios = require("axios");

const payloads = require("../helpers/payloads");
const apiUrl = "https://slack.com/api";

const getRequest = async (url, headers, data) => axios.get(url, headers, data);

const postRequest = async (method, payload) => {
  try {
    let data = Object.assign({ token: process.env.SLACK_BOT_TOKEN }, payload);
    let result = await axios.post(`${apiUrl}/${method}`, data, {
      headers: { Authorization: "Bearer " + process.env.SLACK_BOT_TOKEN, "Content-Type": "application/json; charset=utf-8" }
    });
    return result.data;

  } catch (error) {
    console.log(error);
  }

};

const sendMessage = async (user) => {
  let channel = await postRequest("im.open", { user });

  let message = payloads.welcomeMessage();
  message.channel = channel.channel.id;

  await postRequest("chat.postMessage", message);
};

const appMentionMessage = async (user, channel) => {
  let text = `Hej <@${user}> :tada: Skriv /info för mer information om vad jag kan göra.`;
  await postRequest("chat.postEphemeral", { user, channel, text });
};

module.exports = { appMentionMessage, sendMessage, postRequest, getRequest };
