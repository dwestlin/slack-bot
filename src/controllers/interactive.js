const axios = require("axios");
const User = require('../models/User');
const {
  getUserInfo
} = require("../helpers/payloads");
/**
 *
 * Function that is supposed to handles all the interactive messages.
 * TODO: Implement interactive cases at SLACK API.
 *
 */
const interactiveHandler = async (req, res) => {
  try {
    let payload = JSON.parse(req.body.payload);

    let data = await User.findById(payload.actions[0].selected_user);
    let url = payload.response_url;

    let message = getUserInfo({
      name: data ? `<@${data.id}>` : `<@${payload.actions[0].selected_user}>`,
      text: data ? data.bio : `Got no information about <@${payload.actions[0].selected_user}> yet`,
      imageUrl: data ? data.image : "https://api.slack.com/img/blocks/bkb_template_images/plants.png"
    })

    axios.post(url, message).then(result => {
      return res.status(200).end();
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

module.exports = { interactiveHandler };
