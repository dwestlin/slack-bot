const app = require("./app");
const PORT = process.env.PORT || 3000;

//STARTING THE SERVER
app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));
