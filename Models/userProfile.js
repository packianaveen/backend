const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let profileSchema = new Schema(
  {
    phone: {
      type: String,
    },

    name: {
      type: String,
    },
    photo: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    user: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },

  {
    collection: "profile",
  }
);
module.exports = mongoose.model("profile", profileSchema);
