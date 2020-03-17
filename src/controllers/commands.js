const {
  weatherMessage,
  welcomeMessage,
  getUsersMessage
} = require("../helpers/payloads");
const axios = require("axios");

const eventsCommand = (req, res) => {
  try {
    // if (!validateRequest(req, res)) {
    //   return res.status(501).end();
    // }

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
    let header = {
      headers: {
        "Content-Type": "application/json"
      }
    };

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
    axios.post(url, weatherData, header).then(result => {
      return res.status(200).end();
    });
  } catch (error) {
    return res.status(200).send("City not found");
  }
};

const jokeCommand = async (req, res) => {
  try {
    let joke = await getRandomJoke();
    let url = req.body.response_url;
    let header = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let payload = {
      username: req.body.user_id,
      response_type: "in_channel",
      text: `_${joke.data.value.joke}_`
    };

    axios.post(url, payload, header).then(result => {
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
    let header = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let payload = welcomeMessage({
      username: req.body.user_id,
      channel: req.body.channel_id
    });

    axios.post(url, payload, header).then(result => {
      return res.status(200).end();
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).end();
  }
};

const userCommand = async (req, res) => {
  try {
    let url = req.body.response_url;
    let header = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    let payload = getUsersMessage({
      username: req.body.user_id,
      channel: req.body.channel_id,
      text: req.body.text
    });

    axios.post(url, payload, header).then(result => {
      res.status(200).end();
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).end();
  }
};

async function getRandomJoke() {
  let url = "http://api.icndb.com/jokes/random";
  let header = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return axios.get(url, header);
}

async function getWeather(city) {
  //
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
  let header = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return axios.get(url, header);
}

module.exports = {
  userCommand,
  eventsCommand,
  weatherCommand,
  infoCommand,
  jokeCommand
};
