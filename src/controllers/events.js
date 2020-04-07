const {
  appMentionMessage,
  sendMessage,
  welcomeMessage
} = require("./messages");


// Handles the incoming events based on type of message.
const eventHandler = async (req, res) => {
  try {
    console.log("EVENTHANDLER: ", req.body);
    const { user, channel } = req.body.event;

    switch (req.body.event.type) {
      case "app_mention":
        appMentionMessage(user, channel);
        res.status(200).end();
        break;
      case "message":
        // It doesn't need to handle a message if the bot is typing.
        if (!req.body.event.bot_profile && !req.body.event.bot_id) {
          sendMessage(user, channel);
          res.status(200).end();
          break;
        }

        res.status(204).end();
        break;
      case "team_join":
        welcomeMessage(user);
        res.status(200).end();
        break;
      default:
        return res.status(204).end();
    }
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

module.exports = { eventHandler };
