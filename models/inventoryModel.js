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
