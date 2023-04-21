const { model, Schema } = require("mongoose");

const borrowSchema = new Schema(
  {
    propertyNo: {
      type: String,
      required: [true, "propertyNo is a required field"],
    },
    fullName: {
      type: String,
      required: [true, "fullName is a required field"],
    },
    address: {
      type: String,
      required: [true, "address is a required field"],
    },
    contactNumber: {
      type: String,
      required: [true, "contactNumber is a required field"],
    },
    equipment: {
      type: String,
      required: [true, "equipment is a required field"],
    },
    qty: {
      type: Number,
      required: [true, "qty is a required field"],
    },
    purpose: {
      type: String,
      required: [true, "purpose is a required field"],
    },
    condition: {
      type: String,
      required: [true, "condition is a required field"],
    },
    role: {
      type: String,
      required: [true, "role is a required field"],
    },
    isBorrowed: {
      type: Boolean,
      required: [true, "isBorrowed is a required field"],
    },
    dateReturn: {
      type: String,
      required: [true, "dateReturn is a required field"],
    },
    location: {
      type: String,
      required: [true, "location is a required field"],
    },
    specificLocation: {
      type: String,
      required: [true, "specificLocation is a required field"],
    },

    image: {
      imageUrl: {
        type: String,
      },
      _id: {
        type: String,
      },
    },
  },
  {
    collection: "borrow",
    timestamps: true,
  }
);

module.exports = model("Borrow", borrowSchema);
