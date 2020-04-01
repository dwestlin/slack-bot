const mongoose = require("mongoose");

require("dotenv").config();
const server = process.env.DB_SERVER;
const name = process.env.DB_NAME;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`${server}`, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("Database connection established");
      })
      .catch(err => {
        console.log("error: ", err);
      });
  }
}

module.exports = new Database();
