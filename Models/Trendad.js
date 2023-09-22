const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let trendadSchema = new Schema(
  {
    name: {
      type: String,
    },

    service: {
      type: String,
    },
    catogery: {
      type: String,
    },
    photo: {
      type: String,
    },
    admin: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },

  {
    collection: "Trendads",
  }
);
module.exports = mongoose.model("Trendads", trendadSchema);
