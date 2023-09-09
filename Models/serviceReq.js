const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let catogeriesSchema = new Schema(
  {
    catagery: {
      type: String,
    },
    service: {
      type: String,
    },
    user: {
      type: String,
    },
    status: {
      type: String,
      default: "open",
    },
    type: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },

  {
    collection: "servicerequest",
  }
);
module.exports = mongoose.model("servicerequest", catogeriesSchema);
