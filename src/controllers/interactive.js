const axios = require("axios");
const User = require('../models/User')
/**
 *
 * Function that is supposed to handles all the interactive messages.
 * TODO: Implement interactive cases at SLACK API.
 *
 */
const interactiveHandler = async (req, res) => {
  try {
    let payload = JSON.parse(req.body.payload);

    let header = {
      headers: {
        "Content-type": "application/json"
      }
    };

    let data = await User.findById(req.body.user_id);

    if (!data) {
      // insert it into the text field.
      let message = {
        text: `Got no information about <@${payload.actions[0].selected_user}> yet`,
        replace_original: false
      };
    } else {
      let message = {
        text: `${data.bio}`,
        replace_original: false
      }
    }

    axios.post(payload.response_url, message, header).then(result => {
      return res.status(200).end();
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

module.exports = { interactiveHandler };
