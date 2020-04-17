require("dotenv").config();
const crypto = require("crypto");
const timingSafeCompare = require('tsscmp');

// Callback function that exports  a parsed rawBody into the request.
// This function is needed in order to verify requests from Slack's API.
const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

const bodyChallenge = (req, res, next) => {
  if (req.body.type === "url_verification") {
    return res.status(200).send(req.body.challenge);
  }
  next();
};

const validateRequest = (req, res, next) => {
  try {
    const signature = req.header("X-Slack-Signature");
    const timestamp = req.header("X-Slack-Request-Timestamp");
    const hmac = crypto.createHmac('sha256', process.env.SLACK_CLIENT_SIGNING_SECRET);
    const [version, hash] = signature.split('=');

    // Check if the timestamp is too old
    const fiveMinutesAgo = ~~(Date.now() / 1000) - (60 * 5);
    if (timestamp < fiveMinutesAgo) return res.status(404).end();

    hmac.update(`${version}:${timestamp}:${req.rawBody}`);

    // check that the request signature matches expected value
    if (!timingSafeCompare(hmac.digest('hex'), hash)) {
      return res.status(401).end();
    }
    next();
  } catch (error) {
    return res.status(401).json({
      status: "Failed",
      message: "You don't have authorization to request that url."
    });
  }
};


const notFound = (req, res, next) => {
  res.status(404);

  const error = new Error(`Did not found ${req.originalUrl}`);

  next(error);
};

const errorHandler = (err, req, res) => {

  const code = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(code);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack
  });
};

module.exports = { rawBodySaver, validateRequest, notFound, errorHandler, bodyChallenge };
