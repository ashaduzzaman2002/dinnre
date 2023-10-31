const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");

exports.getMenu = async (req, res) => {
  try {
    const items = await Food.find();

    res.json({ success: true, items });
  } catch (error) {
    console.log(error);
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({verified: true}).select('-password');

    res.json({ success: true, restaurants });
  } catch (error) {
    console.log(error);
  }
};
