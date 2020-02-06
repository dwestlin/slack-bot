const router = require("express").Router();
const {
    install,
    authProcess
} = require('../controllers/oauth');

// ROUTES
router
    .get("/install", install)
    .get("/auth", authProcess);

module.exports = router;