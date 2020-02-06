const axios = require('axios')

const interactiveHandler = async (req, res) => {
    try {
        let payload = JSON.parse(req.body.payload)
        //TODO initialize database and retrieve information based on userid. 
        let header = {
            headers: {
                'Content-type': 'application/json'
            }

        }
 
        // insert it into the text field.
        let message = {
            "text": `${payload.user.name} clicked: <@${payload.actions[0].selected_user}>`,
            "replace_original": false
        }

        await axios.post(payload.response_url, message, header)
        return res.status(200).end()
    } catch (error) {
        console.log("ERROR:", error)
        res.status(500).end()
    }
}

module.exports = { interactiveHandler }