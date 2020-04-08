require("dotenv").config();
const axios = require("axios");

const User = require("../models/User");
const { getUserInfo } = require("../helpers/payloads");
const { postRequestAPI, getRequest } = require("../helpers/api");
/**
 *
 * Function that is supposed to handles all the interactive messages.
 * TODO: Implement interactive cases at SLACK API.
 *
 */
const interactiveHandler = async (req, res) => {
  try {
    let payload = JSON.parse(req.body.payload);
    let { type } = payload;

    switch (type) {
    case "view_submission":
      dialogHandler(req, res);
      break;
    case "block_actions":
      blockHandler(req, res);
      break;
    default:
    }
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

const blockHandler = async (req, res) => {
  try {
    let payload = JSON.parse(req.body.payload);
    let { selected_user } = payload.actions[0];

    let data = await User.findById(selected_user);

    let name = data ? `<@${data.id}>` : `<@${selected_user}>`;
    let text = data ? data.bio : `Got no information about <@${selected_user}> yet`;
    let imageUrl = data ? data.image : "https://api.slack.com/img/blocks/bkb_template_images/plants.png";

    let message = getUserInfo({ name, text, imageUrl });

    axios.post(payload.response_url, message).then(() => res.status(200).end());
  } catch (error) {
    res.status(500).end();
  }

};

const dialogHandler = async (req, res) => {
  try {
    let { view, user } = JSON.parse(req.body.payload);
    let { value } = view.state.values.message.bio_input;

    let userInfo = await getRequest(`https://slack.com/api/users.info?token=${process.env.SLACK_BOT_TOKEN}&user=${user.id}&pretty=1`);

    await User.findById(userInfo.data.user.id, (err, doc) => {
      if (err) {
        console.log("ERROR: ", err);
      }

      // if no user..
      if (!doc) {
        doc = new User({
          _id: userInfo.data.user.id,
          name: user.username,
          bio: value,
          image: userInfo.data.user.profile.image_72
        });

      } else {
        //updating both profile picture and the biography.
        doc.image = userInfo.data.user.profile.image_72;
        doc.bio = value;
      }

      // Saving user to the database.
      doc.save().then(() => res.status(200).end()).catch(err => console.log(err));
    });

    await sendConfirmation(userInfo.data.user.id);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const sendConfirmation = async (userId) => {
  // open a DM channel for that user
  let channel = await postRequestAPI("im.open", { user: userId });

  let message = {
    channel: channel.channel.id,
    text: "Din biografi är inlagd"
  };

  await postRequestAPI("chat.postMessage", message);

};

module.exports = { interactiveHandler };
