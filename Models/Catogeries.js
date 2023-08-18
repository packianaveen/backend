const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let catogeriesSchema = new Schema(
  {
    name: {
      type: String,
    },
    orderNo: {
      type: String,
    },
    status: {
      type: String,
    },
    photo: {
      type: String,
    },
  },

  {
    collection: "Catogeries",
  }
);
module.exports = mongoose.model("Catogeries", catogeriesSchema);
