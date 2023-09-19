const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let bottomadSchema = new Schema(
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
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },

  {
    collection: "Bottomads",
  }
);
module.exports = mongoose.model("Bottomads", bottomadSchema);
