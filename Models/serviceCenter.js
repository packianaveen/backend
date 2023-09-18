const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ServiceCenterSchema = new Schema(
  {
    name: {
      type: String,
    },

    phoneNo: {
      type: String,
    },
    status: {
      type: String,
    },
    address: {
      type: String,
    },
    services: {
      type: String,
    },
    pin: {
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
    collection: "ServiceCenter",
  }
);
module.exports = mongoose.model("ServiceCenter", ServiceCenterSchema);
