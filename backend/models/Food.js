const mongoose = require('mongoose');

// Define the food schema
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    img: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['non-veg', 'veg'],
      required: true,
      default: 'non-veg',
    },

    category: {
      type: String,
      enum: ['all-time', 'breakfast', 'launch', 'dinner'],
      required: true,
      default: 'all-time',
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Food', foodSchema);
