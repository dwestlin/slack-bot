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
- [x] Able to add brief information about all employees (eg by typing `/addinfo "hello my name is John/Jane Doe"`)
- [x] Storing above info in mongodb-database.

## Requirements

The bot should also be able to handle following events.
- [ ] The bot should send a message every Thursday reminding about the coffee meeting.
- [ ] Host the bot (where? should it be containerized?). At this point it's hosted in Dockerfile at a raspberry pi.

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
