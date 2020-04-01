const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  bio: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);
