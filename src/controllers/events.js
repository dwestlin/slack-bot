const {
  appMentionMessage,
  sendMessage,
  welcomeMessage
} = require("./messages");

// Handles the incoming events based on type of message.
const eventHandler = async (req, res) => {
  try {
    switch (req.body.event.type) {
      case "app_mention":
        appMentionMessage(req, res);
        break;
      case "message":
        // It doesn't need to handle a message if the bot is typing.
        if (!req.body.event.bot_profile && !req.body.event.bot_id) {
          sendMessage(req, res);
          break;
        }
        res.status(204).end();
        break;
      case "team_join":
        welcomeMessage(req, res);
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
