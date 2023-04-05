const {Schema, model} = require('mongoose')

const imageSchema = new Schema({
    name: String,
    contentType: String,
    image: Buffer,
  }, { collection: "images",});

  module.exports = model("Image", imageSchema);
