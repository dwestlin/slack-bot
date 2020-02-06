require("dotenv").config()

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { rawBodySaver } = require('./helpers/rawBodySaver')
const apiRoutes = require("./routes/api")
const { validateRequest } = require('./helpers/validateRequest')

// MIDDLEWARES
app.use(bodyParser.json({
  verify: rawBodySaver
}))
app.use(bodyParser.urlencoded({
  verify: rawBodySaver,
  extended: true
}))

// VALIDATES THAT REQUEST COMES FROM SLACK'S API
app.use(validateRequest)

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the IBM slackbot. This is just an API.")
})

app.use("/api", apiRoutes)

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  })
})

module.exports = app