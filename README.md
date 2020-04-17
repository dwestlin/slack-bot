# IBM Slack bot

![imb logo](https://i.ya-webdesign.com/images/ibm-logo-white-png-18.png)

This repository contains a project for a bot in the IBM **Slack** forum. The bot will have a number of functions and features listed below.

![info-gif](https://media.giphy.com/media/VJkvx9oeiYnpB0p50L/giphy.gif)

## Features

The bot has the following features:

- [x] Sends welcome message to everyone joining the workspace.
- [x] Lists all users in workspace
- [x] Get current weather in the specified city.
- [x] Tells random jokes.
- [x] Listens to messages adressed to the bot.
- [x] Able to add brief information about all employees (eg by typing `/biography`)
- [x] Storing bio info in database.


## Setup

### Create a Slack app

1. Create an app at [https://api.slack.com/apps](https://api.slack.com/apps)
2. Add a Slash command (See *Add a Slash Command* section below)
3. Enable Interactive components (See *Enable Interactive Components* below)
4. Navigate to the **OAuth & Permissions** page and select the following bot token scopes:
    * `app_mentions:read`
    * `channels:join`
    * `channels:manage`
    * `channels:read`
    * `channels:history`
    * `chat:write`
    * `chat:write:customize`
    * `chat:write:public`
    * `commands`
    * `groups:history`
    * `groups:read`
    * `im:history`
    * `im:read`
    * `im:write`
    * `incoming-webhook`
    * `links:write`
    * `mpim:history`
    * `mpim:write`
    * `reactions:read`
    * `reactions:write`
    * `users.profile:read`
    * `users:read`
    * `users:read.email`
    
5. Click 'Save Changes' and install the app (You should get an OAuth access token after the installation)

#### Add a Slash Command
1. Go to the app settings and click on Slash Commands.
1. Click the 'Create New Command' button and fill in the following:
    * Command: `/info`
    * Request URL: Your server URL + `/api/commands/info`
    * Command: `/weather`
    * Request URL: Your server URL + `/api/commands/weather`
    * Command: `/jokes`
    * Request URL: Your server URL + `/api/commands/jokes`
    * Command: `/users`
    * Request URL: Your server URL + `/api/commands/users`
    * Command: `/biography`
    * Request URL: Your server URL + `/api/commands/biography`

### Subscribe to bot events
1. Go to the app settings and click on Event Subscriptions.
1. Set the Request URL to your server URL (*e.g.* `https://yourURL.com`) + `/api/events/messages`. 
3. Click the "Add Bot User Event" and fill in the following:
    * app_mention
    * im_created
    * member_joined_channel
    * message.channels
    * message.groups
    * message.im
    * team_join


#### Enable Interactive Components
1. Go back to the app settings and click on Interactive Components.
1. Set the Request URL to your server URL (*e.g.* `https://yourURL.com`) + `/api/events/interactive`.
1. Save the change.


### Set Your Credentials

1. Set the following environment variables to `.env` (see `.env.sample`):
    * `SLACK_BOT_TOKEN`: Your bot token, `xoxb-` (available on the **OAuth & Permissions** once you install the app)
    * `SLACK_CLIENT_SIGNING_SECRET`: Your app's Signing Secret (available on the **Basic Information** page)
2. If you're running the app locally, run the app (`npm start`).


#### Run the app 

[Node.js](http://nodejs.org/) is required.

1. Get the code
    * Clone this repo https://github.com/dwestlin/slack-bot.git and run `npm install`
2. Set the following environment variables to `.env` (see `.env.sample`):
    * `SLACK_BOT_TOKEN`: Your bot token, `xoxb-` (available on the **OAuth & Permissions** once you install the app)
    * `SLACK_CLIENT_SIGNING_SECRET`: Your app's Signing Secret (available on the **Basic Information** page)
3. If you're running the app locally, run the app (`npm start`).

