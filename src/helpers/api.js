const axios = require('axios');
const qs = require('querystring');
const apiUrl = "https://slack.com/api";

const postRequestAPI = async (method, payload) => {
  try {
    let data = Object.assign({ token: process.env.SLACK_BOT_TOKEN }, payload);
    let result = await axios.post(`${apiUrl}/${method}`, data, {
      headers: { Authorization: "Bearer " + process.env.SLACK_BOT_TOKEN, 'Content-Type': 'application/json; charset=utf-8' }
    });
    return result.data;

  } catch (error) {
    console.log(error);
  }

}

const getRequest = async (url, headers, data) => axios.get(url, headers, data)

module.exports = { postRequestAPI, getRequest }