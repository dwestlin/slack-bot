const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: String,
  bio: {
    required: true,
    type: String
  },
  image: String
});

module.exports = mongoose.model("User", userSchema);
