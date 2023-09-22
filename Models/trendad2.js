const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let trendadSchema1 = new Schema(
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
    collection: "Trendads1",
  }
);
module.exports = mongoose.model("Trendads1", trendadSchema1);
