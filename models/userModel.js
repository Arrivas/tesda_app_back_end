const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name should not be empty"],
    },
    lastName: {
      type: String,
      required: [true, "last name should not be empty"],
    },
    username: {
      type: String,
      required: [true, "username should not be empty"],
    },
    password: {
      type: String,
      required: [true, "password must not be empty"],
    },
  },
  {
    collection: "user",
    timestamps: true,
  }
);

module.exports = model("User", usersSchema);
