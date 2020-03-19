const qs = require("querystring");
const axios = require("axios");
require("dotenv").config();

const url = "https://slack.com/api/oauth.v2.access";

const installBot = async function(req, res) {
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

    let headers = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    var data = {
      form: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: req.query.code
      }
    };

    axios
      .post(url, data, headers)
      .then(result => {
        const { access_token, refresh_token, expires_in, error } = result.data;

        console.log(result.data);

        if (error) {
          res.sendStatus(401);
          console.log(error);
          return;
        }

        axios
          .post(`${url}/team.info`, qs.stringify({ token: access_token }))
          .then(result => {
            if (!result.data.error) {
              res.redirect(`http://${result.data.team.domain}.slack.com`);
            }
          })
          .catch(err => {
            console.error(err);
          });
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
