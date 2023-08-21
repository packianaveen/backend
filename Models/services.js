const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let servicesSchema = new Schema(
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
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },

  {
    collection: "Services",
  }
);
module.exports = mongoose.model("Services", servicesSchema);
