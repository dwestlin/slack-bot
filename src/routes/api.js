const router = require("express").Router();

router
  .use("/commands", require("./commands"))
  .use("/events", require("./events"))
  .use("/oauth", require("./oauth"));

module.exports = router;
