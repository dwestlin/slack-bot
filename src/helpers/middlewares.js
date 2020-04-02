require("dotenv").config();
const crypto = require("crypto");

// Callback function that exports  a parsed rawBody into the request.
// This function is needed in order to verify requests from Slack's API.
const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

const bodyChallenge = (req, res, next) => {
  if (req.body.type === "url_verification") {
    res.status(200).send(req.body.challenge);
    next();
  }
}

// Middleware that verifies the request comes from slack.
const validateRequest = (req, res, next) => {
  try {

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
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "You don't have authorization to request that url."
    });
    return false;
  }
};

const notFound = (req, res, next) => {
  res.status(404);

  const error = new Error(`Did not found ${req.originalUrl}`);

  next(error);
};

const errorHandler = (err, req, res, next) => {

  const code = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(code);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

module.exports = { rawBodySaver, validateRequest, notFound, errorHandler, bodyChallenge };
