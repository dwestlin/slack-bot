const qs = require("querystring");
const axios = require('axios');
require("dotenv").config();

module.exports.install = async function (req, res) {
  try {
    let url = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&team=${process.env.SLACK_TEAM}&redirect_url=${process.env.SLACK_redirectUrl}&scope=${process.env.SLACK_scopes}`;

  
    res.status(302).redirect(url);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }

};

module.exports.authProcess = async (req, res) => {
  try {
    if (!req.query.code) {
      return res.status(401).end();
    }
    let code = req.query.code;
    let headers = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }

    };

    let url = "https://slack.com/api/oauth.v2.access";

    let data = qs.stringify({
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: code
    });


    axios.post(url, data, headers).then(result => {
      return res.status(200).send(`Bot installed at ${result.data.team.name} workspace.`);
    }).catch(err => {
      return res.status(500).end();
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};