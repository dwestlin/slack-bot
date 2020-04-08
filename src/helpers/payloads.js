/**
 *
 * CUSTOM MESSAGES THAT BOT SENDS IN SLACK.
 *
 */

const getUsersMessage = data => {
  return {
    username: data.user_id,
    channel: data.channel_id,
    text: data.text,
    blocks: [
      {
        type: "section",
        block_id: "getUserInfo",
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
          text: `${data.name} \n - ${data.text}`
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

const welcomeMessage = () => {
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Hallå där och varmt välkommen till teamet :tada: \n Mitt namn är IBM-boten och min uppgift är att lista användbara kommandon och ge information om våra medarbetare."
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
          text: "*:two: Använd `/info || !help` * Visar denna informationstext igen."
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
            "*:four: Använd `/weather <Stad>` * Ger dig information om vädret samt temperatur."
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*:five: Använd `/biography` * För att lägga in en presentation om dig själv."
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

const openModal = context => {
  return {
    trigger_id: context.trigger_id,
    view: {
      type: "modal",
      title: {
        type: "plain_text",
        text: "IBM"
      },
      callback_id: "addinfo",
      submit: {
        type: "plain_text",
        text: "Submit",
        emoji: true
      },
      close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true
      },
      blocks: [
        {
          block_id: "message",
          type: "input",
          element: {
            action_id: "bio_input",
            type: "plain_text_input",
            multiline: true,
            placeholder: {
              type: "plain_text",
              text: "Add some information about yourself..."
            }
          },
          label: {
            type: "plain_text",
            text: "Biography"
          }
        }
      ]
    }
  };
};

module.exports = { openModal, welcomeMessage, getUserInfo, weatherMessage, getUsersMessage };
