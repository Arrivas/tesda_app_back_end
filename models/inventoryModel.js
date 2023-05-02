const { model, Schema } = require("mongoose");

const inventorySchema = new Schema(
  {
    propertyNo: {
      type: String,
      required: [true, "propertyNo is a required field"],
    },
    equipment: {
      type: String,
      required: [true, "equipment is a required field"],
    },
    qty: {
      type: Number,
      required: [true, "qty is a required field"],
    },
    purchaseDate: {
      type: String,
      required: [true, "qty is a required field"],
    },
    receiveBy: {
      type: String,
      required: [true, "qty is a required field"],
    },
    classification: {
      type: String,
      required: [true, "classification is a required field"],
    },
    specification: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "amount is a required field"],
    },
    unit: {
      type: String,
    },
    image: {
      imageUrl: {
        type: String,
      },
      _id: {
        type: String,
      },
    },
    docType: {
      type: String,
      required: [true, "docType is a required field"],
    },
  },

  {
    collection: "inventory",
    timestamps: true,
  }
);

module.exports = model("Inventory", inventorySchema);
