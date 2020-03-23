require("dotenv").config();
const crypto = require("crypto");

// Middleware that verifies the request comes from slack.
const validateRequest = (req, res, next) => {
  try {
    if (req.body.type === "url_verification") {
      return res.status(200).send(req.body.challenge);
    }

    if (process.env.SLACK_CLIENT_SIGNING_SECRET && req.rawBody) {
      let timestamp = req.header("X-Slack-Request-Timestamp");
      let body = req.rawBody;
      let signature = ["v0", timestamp, body];

      let basestring = signature.join(":");
      const hashCode =
        "v0=" +
        crypto
          .createHmac("sha256", process.env.SLACK_CLIENT_SIGNING_SECRET)
          .update(basestring)
          .digest("hex");
      let recievedSignature = req.header("X-Slack-Signature");

      // Compare the hash of the computed signature with the retrieved signature with a secure hmac compare function
      const validSignature = () => {
        const slackBuffer = Buffer.from(recievedSignature);
        const compBuffer = Buffer.from(hashCode);
        return crypto.timingSafeEqual(slackBuffer, compBuffer);
      };
      // replace direct compare with the hmac result
      if (!validSignature()) {
        return res.status(401).end();
      }
      next();
    }
    res.status(401).end();
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "You don't have authorization to request that url."
    });
    return false;
  }
};

module.exports = { validateRequest };
