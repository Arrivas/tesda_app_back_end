const { Schema, model } = require("mongoose");

const authSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is a required field"],
  },
  password: {
    type: String,
    required: [true, "password is a required field"],
  },
});

module.exports = model("Auth", authSchema);
