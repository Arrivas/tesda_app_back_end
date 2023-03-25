const { model, Schema } = require("mongoose");

const borrowSchema = new Schema(
  {
    SSP: {
      type: String,
      required: [true, "SSP is a required field"],
    },
    propertyNo: {
      type: String,
      required: [true, "propertyNo is a required field"],
    },
    receivedBy: {
      type: String,
      required: [true, "receivedBy is a required field"],
    },
    isBorrowed: {
      type: Boolean,
      required: [true, "isBorrowed is a required field"],
    },
  },
  {
    collection: "borrow",
    timestamps: true,
  }
);

module.exports = model("Borrow", borrowSchema);
