
const axios = require("axios");

const { postRequestAPI, getRequest } = require('../helpers/api');
const { weatherMessage, welcomeMessage, getUsersMessage, openModal } = require("../helpers/payloads");


const commandHandler = (req, res) => {
  let type = req.params.command;

  switch (type) {
    case 'events':
      getEvents(req, res);
      break;
    case 'info':
      getInfo(req, res);
      break;
    case 'users':
      getUsers(req, res);
      break;
    case 'jokes':
      getJoke(req, res);
      break;
    case 'weather':
      getWeather(req, res);
      break;
    case 'biography':
      addBiography(req, res);
      break;
    default:
      console.log("nothing")
  }
};

const getEvents = (req, res) => {
  try {
    //TODO Implement event command.
    res.status(200).send("EVENTS");
  } catch (error) {
    console.log("ERROR:", error);
  }
};

const getWeather = async (req, res) => {
  try {
    let city = req.body.text;
    let { response_url, user_id, channel_id, } = req.body;
    let weather = await getRequest(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`);

    // Storing the data to be sent to webhook url.
    let weatherData = weatherMessage({
      username: user_id,
      channel: channel_id,
      text: city,
      name: `${weather.data.name}, ${weather.data.sys.country}`,
      description: weather.data.weather[0].description,
      temp: weather.data.main.temp,
      icon: weather.data.weather[0].icon
    });

    //sending the weatherdata back to slack webhook url.
    axios.post(response_url, weatherData).then(result => {
      return res.status(200).end();
    });
  } catch (error) {
    return res.status(200).send("City not found");
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

    axios.post(response_url, payload).then(result => {
      return res.status(200).end();
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

const getInfo = async (req, res) => {
  try {
    let { response_url } = req.body;

    let payload = welcomeMessage();

    axios.post(response_url, payload).then(result => {
      return res.status(200).end();
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).end();
  }
};

const addBiography = async (req, res) => {
  try {
    const { trigger_id } = req.body;

    let view = openModal({
      trigger_id
    })

    await postRequestAPI('views.open', view);
    res.status(200).end();
  } catch (error) {
    res.status(500).end()
  }

}


const getUsers = async (req, res) => {
  try {
    let { response_url, user_id, channel_id, text } = req.body;
    let payload = getUsersMessage({ user_id, channel_id, text });

    axios.post(response_url, payload).then(result => res.status(200).end());
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};


module.exports = {
  commandHandler
};
