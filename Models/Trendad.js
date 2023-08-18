const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let trendadSchema = new Schema(
  {
    name: {
      type: String,
    },

    url: {
      type: String,
    },
    photo: {
      type: String,
    },
  },

  {
    collection: "Trendads",
  }
);
module.exports = mongoose.model("Trendads", trendadSchema);
