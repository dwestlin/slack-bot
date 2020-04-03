const axios = require('axios');
const qs = require('querystring');
const apiUrl = "https://slack.com/api";

const postRequestAPI = async (method, payload) => {
  let data = Object.assign({ token: process.env.SLACK_BOT_TOKEN }, payload);
  let result = await axios.post(`${apiUrl}/${method}`, qs.stringify(data));
  return result.data;
}

const getRequestAPI = async (method, payload) => {

}

module.exports = { postRequestAPI, getRequestAPI }