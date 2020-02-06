const axios = require("axios")
const payloads = require("../helpers/payloads")
const qs = require("querystring")
const apiUrl = "https://slack.com/api"

const sendMessage = (req, res) => {
    try {
        let message = `<@${req.body.event.user}>, skickade ett meddelande :thumbsup:`

        let data = qs.stringify({
            user: req.body.event.user,
            token: process.env.SLACK_BOT_TOKEN,
            channel: req.body.event.channel,
            text: message
        })

        let header = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        axios.post(`${apiUrl}/chat.postEphemeral`, data, header)
            .then(result => {
                return res.status(200).end()
            })
            .catch(error => {
                console.log("ERROR: ", error)
                res.status(500).end()
            })
    } catch (error) {
        res.status(500).end()
    }
}

const welcomeMessage = (req, res) => {
    try {
        let data = qs.stringify({
            user: req.body.event.user,
            token: process.env.SLACK_BOT_TOKEN
        })

        let header = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        axios
            .post(`${apiUrl}/im.open`, data, header)
            .then(result => {
                let message = payloads.welcomeMessage()

                message.channel = result.data.channel.id

                return axios.post(`${apiUrl}/chat.postMessage`, message, {
                    headers: {
                        Authorization: "Bearer " + process.env.SLACK_BOT_TOKEN
                    }
                })
            })
            .then(result => {
                res.status(200).end()
            })
            .catch(error => {
                console.log("ERROR:", error)
                res.status(500).end()
            })
    } catch (error) {
        console.log("ERROR:", error)
        res.status(500).end()
    }
}

const appMentionMessage = (req, res) => {
    try {
        let message = `Hej <@${req.body.event.user}>, du pingade mig :tada: Skriv /info för mer information om vad jag kan göra.`

        let header = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        let data = qs.stringify({
            token: process.env.SLACK_BOT_TOKEN,
            channel: req.body.event.channel,
            text: message,
            user: req.body.event.user
        })

        axios
            .post(`${apiUrl}/chat.postEphemeral`, data, header)
            .then(result => {
                res.status(200).end()
            })
            .catch(err => {
                console.log("ERROR: ", err)
                res.status(500).end()
            })
    } catch (error) {
        console.log("ERROR:", error)
        res.status(500).end()
    }
}
module.exports = {appMentionMessage, sendMessage, welcomeMessage}