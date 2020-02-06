
// Callback function that exports  a parsed rawBody into the request.
// This function is needed in order to verify requests from Slack's API.
const rawBodySaver = (req,res,buf,encoding) =>{
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || "utf8")
      }
}

module.exports = {rawBodySaver}