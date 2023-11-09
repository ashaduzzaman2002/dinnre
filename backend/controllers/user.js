const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");

exports.getMenu = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 8;

  try {
    const items = await Food.find()
      .skip(page * limit)

    const total = await Food.countDocuments();

    res.json({ success: true, items });
  } catch (error) {
    console.log(error);
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ verified: true }).select(
      "-password"
    );

    res.json({ success: true, restaurants });
  } catch (error) {
    console.log(error);
  }
};

exports.getRestaurantById = async (req, res) => {
  let id = req.params?.id;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant)
      return res
        .status(404)
        .json({ sucess: false, msg: "Restaurant not found" });

    const menu = await Food.find({ restaurant: restaurant._id });

    const safeRestaurant = {
      _id: restaurant._id,
      name: restaurant.name,
      email: restaurant.email,
      location: restaurant.location,
      city: restaurant.city,
      about: restaurant.about,
      profile_img: restaurant.profile_img,
      verified: restaurant.verified,
      menu,
    };
    res.json({ success: true, data: safeRestaurant });
  } catch (error) {
    console.log(error);
    res.status(404).json({ sucess: false, msg: "Restaurant not found" });
  }
};
