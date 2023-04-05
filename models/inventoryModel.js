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
    imageUrl: {
      type: "string",
    },
  },

  {
    collection: "inventory",
    timestamps: true,
  }
);

module.exports = model("Inventory", inventorySchema);
