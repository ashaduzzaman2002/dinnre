const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    customerNumber: {
      type: Number,
      required: true,
    },

    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },

    items: Array,
    totalAmount: {
      type: Number,
      required: true,
    },
    pin: {
      type: Number,
      required: true,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
