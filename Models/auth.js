const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let loginSchema = new Schema(
  {
    phone: {
      type: String,
    },

    password: {
      type: String,
    },
    pin: {
      type: String,
    },
    type: {
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
    collection: "users",
  }
);
module.exports = mongoose.model("users", loginSchema);
