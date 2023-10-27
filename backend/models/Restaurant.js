const mongoose = require("mongoose");

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },

    profile_img: {
      type: String,
    },

    logo: {

    },

    bankName: {
      type: String,
    },

    accountNo: {
      type: String,
    },

    ifsc: {
      type: String,
    },

    upi: {
      type: String,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
