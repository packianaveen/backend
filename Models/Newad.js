const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let adSchema = new Schema(
  {
    name: {
      type: String,
    },

    services: {
      type: String,
    },
    photo: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },

  {
    collection: "Ads",
  }
);
module.exports = mongoose.model("Ads", adSchema);
