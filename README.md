# IBM Slack bot

![imb logo](https://i.ya-webdesign.com/images/ibm-logo-white-png-18.png)

This repository contains a project for a bot in the IBM **Slack** forum. The bot will have a number of functions and features listed below.

## Features

The bot has the following features:

- [x] Sends welcome message to everyone joining the workspace.
- [x] Lists all users in workspace
- [x] Get current weather in the specified city.
- [x] Tells random jokes.
- [x] Listens to messages adressed to the bot.

## Requirements

The bot should also be able to handle following events.

- [ ] Users should be able to add brief information about themselves (eg by typing `/addinfo "hello my name is John Doe"`).
- [ ] Storing above info in database. (follow up question: where should we store that info? does IBM have internal database hosting alternative?)
- [ ] The bot should send a message every Thursday reminding about the coffee meeting.
- [ ] Host the bot (where? should it be containerized?)

---

## Prerequisites

Create a bot user at https://api.slack.com/

## Installation

[Node.js](http://nodejs.org/) is required.

```shell
$ git clone https://github.com/dwestlin/slack-bot.git
$ cd slack-bot
$ npm install
$ create .env file based on the .env.sample credentials.
```

## Run

```shell
$ npm start
```
