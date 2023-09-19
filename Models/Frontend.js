const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let frontendSchema = new Schema(
  {
    colur: {
      type: String,
    },
    topText: {
      type: String,
    },
  },

  {
    collection: "frontend",
  }
);
module.exports = mongoose.model("frontend", frontendSchema);
