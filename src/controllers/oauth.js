const qs = require("querystring");
const axios = require("axios");

const url = "https://slack.com/api/oauth.v2.access";

// redirecting to slack website from /install route.
const installBot = (req, res) => {
  try {
    let redirectUrl = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&redirect_url=${process.env.SLACK_REDIRECT_URL}&scope=${process.env.SLACK_scopes}`;

    res.status(302).redirect(redirectUrl);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

// function that handles the auth process.
const authProcess = async (req, res) => {
  try {
    if (!req.query.code) {
      //no code, no access!
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

    //posting the client_id, client_secret and auth code to slack api.
    axios
      .post(url, data, headers)
      .then(result => {
        // When authed, redirect back to the slack workspace
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
