/**
 *
 * CUSTOM MESSAGES THAT BOT SENDS IN SLACK.
 *
 */

const getUsersMessage = data => {
  return {
    username: data.username,
    channel: data.channel,
    text: data.text,
    blocks: [
      {
        type: "section",
        block_id: "section678",
        text: {
          type: "mrkdwn",
          text:
            "Välj en användare ifrån listan för att få mer information om denne."
        },
        accessory: {
          action_id: "text1234",
          type: "users_select",
          placeholder: {
            type: "plain_text",
            text: "Användare.."
          }
        }
      }
    ]
  };
};

const getUserInfo = data => {
  return {
    text: data.text,
    replace_original: false,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Information: ${data.text}`
        },
        accessory: {
          type: "image",
          image_url: data.imageUrl,
          alt_text: "picture"
        }
      }
    ]
  };
};

const weatherMessage = weather => {
  return {
    username: weather.username,
    channel: weather.channel,
    text: weather.text,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `I ${weather.name} är det ${weather.description} och har en temperatur på ${weather.temp} °C`
        },
        accessory: {
          type: "image",
          image_url: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
          alt_text: "Icon"
        }
      }
    ]
  };
};

const welcomeMessage = data => {
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Hallå där 👋 Mitt namn är IBM-boten och min uppgift är att lista användbara kommandon och ge information om våra medarbetare."
        },
        accessory: {
          type: "image",
          image_url:
            "https://www.freepnglogos.com/uploads/ibm-logo-png/ibm-logo-ibm-vector-logo-download-logoepsm-19.png",
          alt_text: "IBM Logo"
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*:one: Använd `/users` * Visar en lista på medarbetare på IBM"
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*:two: Använd `/info` * Visar denna informationstext igen."
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*:three: Använd `/jokes` * _Berättar_ slumpvisa Chuck Norris skämt."
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*:four: Använd `/weather <stad>` * Ger dig information om vädret samt temperatur."
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        block_id: "section678",
        text: {
          type: "mrkdwn",
          text:
            "Välj en användare ifrån listan för att få mer information om denne."
        },
        accessory: {
          action_id: "text1234",
          type: "users_select",
          placeholder: {
            type: "plain_text",
            text: "Användare.."
          }
        }
      },
      {
        type: "divider"
      }
    ]
  };
};

module.exports = { welcomeMessage, getUserInfo, weatherMessage, getUsersMessage };
