const axios = require("axios");

const { postRequest, getRequest } = require("./api");
const { weatherMessage, welcomeMessage, getUsersMessage, openModal } = require("../helpers/payloads");

const commandHandler = (req, res) => {
  let type = req.params.command;

  /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
  switch (type) {
    case "events":
      getEvents(req, res);
      break;
    case "info":
      getInfo(req, res);
      break;
    case "users":
      getUsers(req, res);
      break;
    case "jokes":
      getJoke(req, res);
      break;
    case "weather":
      getWeather(req, res);
      break;
    case "biography":
      addBiography(req, res);
      break;
    default:
      console.log("nothing");
  }
};

const getEvents = (req, res) => {
  try {
    //TODO Implement event command.
    res.status(200).send("EVENTS");
  } catch (error) {
    console.log("ERROR:", error);
    res.status(200).end();
  }
};

const getInfo = async (req, res) => {
  try {
    let { response_url } = req.body;

    let payload = welcomeMessage();

    axios.post(response_url, payload).then(() => res.status(200).end());
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).end();
  }
};

const getUsers = async (req, res) => {
  try {
    let { response_url, user_id, channel_id, text } = req.body;
    let payload = getUsersMessage({ user_id, channel_id, text });

    axios.post(response_url, payload).then(() => res.status(200).end());
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

const getJoke = async (req, res) => {
  try {
    let joke = await getRequest("http://api.icndb.com/jokes/random");
    let { response_url, user_id } = req.body;

    let payload = {
      username: user_id,
      response_type: "in_channel",
      text: `_${joke.data.value.joke}_`
    };

    axios.post(response_url, payload).then(() => res.status(200).end());
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

const getWeather = async (req, res) => {
  let { response_url, user_id, channel_id, text } = req.body;

  try {
    let weather = await getRequest(`http://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=${process.env.WEATHER_API_KEY}`);

    // Storing the data to be sent to webhook url.
    let weatherData = weatherMessage({
      username: user_id,
      channel: channel_id,
      text,
      name: `${weather.data.name}, ${weather.data.sys.country}`,
      description: weather.data.weather[0].description,
      temp: weather.data.main.temp,
      icon: weather.data.weather[0].icon
    });

    //sending the weatherdata back to slack webhook url.
    axios.post(response_url, weatherData).then(() => res.status(200).end());
  } catch (error) {
    return res.status(200).send(`${text} not found.`);
  }
};

const addBiography = async (req, res) => {
  try {
    const { trigger_id } = req.body;

    let view = openModal({
      trigger_id
    });

    await postRequest("views.open", view);
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};

module.exports = { commandHandler };
