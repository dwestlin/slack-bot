const qs = require("querystring");
const axios = require("axios");
require("dotenv").config();

const url = "https://slack.com/api/oauth.v2.access";

const installBot = async function (req, res) {
  try {
    let redirectUrl = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&team=${process.env.SLACK_TEAM}&redirect_url=${process.env.SLACK_REDIRECT_URL}&scope=${process.env.SLACK_scopes}`;

    res.status(302).redirect(redirectUrl);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

const authProcess = async (req, res) => {
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

    let data = qs.stringify({
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: code
    });

    axios
      .post(url, data, headers)
      .then(result => {
        return res
          .status(302)
          .redirect(`http://${result.data.team.name}.slack.com`);
      })
      .catch(err => {
        return res.status(500).end();
      });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};


module.exports = { installBot, authProcess };
