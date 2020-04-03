const {
  weatherMessage,
  welcomeMessage,
  getUsersMessage
} = require("../helpers/payloads");
const axios = require("axios");
let User = require("../models/User");

const eventsCommand = (req, res) => {
  try {
    //TODO Implement event command.
    res.status(200).send("EVENTS");
  } catch (error) {
    console.log("ERROR:", error);
  }
};

const weatherCommand = async (req, res) => {
  try {
    let city = req.body.text;
    let weather = await getWeather(city);
    let url = req.body.response_url;

    // Storing the data to be sent to webhook url.
    let weatherData = weatherMessage({
      username: req.body.user_id,
      channel: req.body.channel_id,
      text: req.body.text,
      name: `${weather.data.name}, ${weather.data.sys.country}`,
      description: weather.data.weather[0].description,
      temp: weather.data.main.temp,
      icon: weather.data.weather[0].icon
    });

    //sending the weatherdata back to slack webhook url.
    axios.post(url, weatherData).then(result => {
      return res.status(200).end();
    });
  } catch (error) {
    return res.status(200).send("City not found");
  }
};

const jokeCommand = async (req, res) => {
  try {
    let joke = await getRequest("http://api.icndb.com/jokes/random");
    let url = req.body.response_url;

    let payload = {
      username: req.body.user_id,
      response_type: "in_channel",
      text: `_${joke.data.value.joke}_`
    };

    axios.post(url, payload).then(result => {
      return res.status(200).end();
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

const infoCommand = async (req, res) => {
  try {
    let url = req.body.response_url;

    let payload = welcomeMessage({
      username: req.body.user_id,
      channel: req.body.channel_id
    });

    axios.post(url, payload).then(result => {
      return res.status(200).end();
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).end();
  }
};

const addInfoCommand = async (req, res) => {
  try {
    if (req.body.text) {
      let data = await User.findById(req.body.user_id);

      if (!data) {
        let imageUrl = await getUserInfo(req.body.user_id);

        let user = new User({
          _id: req.body.user_id,
          name: req.body.user_name,
          bio: req.body.text,
          image: imageUrl.data.user.profile.image_32
        });

        return user.save().then(usr => res.status(200).send("Informationen om dig är inlagd"));
      }

      data.bio = req.body.text;
      return data.save().then(result => res.status(200).send("Information om dig är uppdaterad")).catch(err => res.status(500).send(err));
    }
    return res.status(200).send("Vänligen uppge information om dig, exempelvis: `/addinfo <information`");
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const userCommand = async (req, res) => {
  try {
    let url = req.body.response_url;

    let payload = getUsersMessage({
      username: req.body.user_id,
      channel: req.body.channel_id,
      text: req.body.text
    });

    axios.post(url, payload).then(result => {
      res.status(200).end();
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

async function getRandomJoke() {
  let url = "http://api.icndb.com/jokes/random";

  return axios.get(url);
}

async function getWeather(city) {
  //
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`;

  return axios.get(url);
}

async function getUserInfo(id) {
  let url = `https://slack.com/api/users.info?token=${process.env.SLACK_BOT_TOKEN}&user=${id}&pretty=1`;

  return axios.get(url);
}

async function getRequest(url) {
  return axios.get(url);
}

module.exports = {
  userCommand,
  eventsCommand,
  weatherCommand,
  infoCommand,
  jokeCommand,
  addInfoCommand
};
