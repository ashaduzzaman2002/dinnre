const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const City = require("../models/City");
const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");
const dataURI = require("../utils/dataUri");
const cloudinary = require("cloudinary");
const Order = require("../models/Order");
const { validationResult } = require("express-validator");
const { mailTransport, mailTemplete, generateOTP } = require("../utils/mail");
const OTP = require("../models/OTP");
const fs = require("fs/promises");

exports.getAllItem = async (req, res) => {
  try {
    const items = await Food.find();

    res.json({ success: true, items });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

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
    res.json({ success: true, restaurant });
  } catch (error) {
    console.log(error);
    res.status(404).json({ sucess: false, msg: "Restaurant not found" });
  }
};

exports.getMenuOfARestaurant = async (req, res) => {
  let id = req.params?.id;

  try {
    const items = await Food.find({ restaurant: id });

    res.json({ success: true, items });
  } catch (error) {
    console.log(error);
  }
};

// OTP
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ success: false, msg: err.array()[0].msg });
    }

    const userExist = await Restaurant.findOne({ email });
    if (userExist)
      return res
        .status(401)
        .json({ succcess: false, msg: "User already exist." });
    const otp = generateOTP();
    const hashOTP = bcrypt.hashSync(otp, 10);

    const otpExist = await OTP.findOne({ email });

    if (otpExist) {
      const updatedOtp = await OTP.findByIdAndUpdate(otpExist?._id, {
        otp: hashOTP,
      });

      if (!updatedOtp)
        return res.status(404).json({ message: "OTP not found" });

      mailTransport().sendMail({
        from: "crezytechy@gmail.com",
        to: email,
        subject: "Please verify your email account",
        html: mailTemplete(otp),
      });

      return res.json({ success: true, message: "OTP send successfully" });
    } else {
      const newOtp = new OTP({
        email,
        otp: hashOTP,
      });

      await newOtp.save();

      mailTransport().sendMail({
        from: "crezytechy@gmail.com",
        to: email,
        subject: "Please verify your email account",
        html: mailTemplete(otp),
      });
      return res.json({ success: true, message: "OTP send successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ success: true, msg: "Internal server error" });
  }
};

// Register Restuarant
exports.registerRestaurant = async (req, res) => {
  const { email, password, otp } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, msg: err.array()[0].msg });
  }

  try {
    const restaurantUser = await Restaurant.findOne({ email });
    if (restaurantUser)
      return res
        .status(400)
        .json({ success: false, msg: "User already exist." });

    const otpValue = await OTP.findOne({ email });
    if (!otpValue)
      return res.status(400).json({ success: false, msg: "Invalid OTP." });

    const isMatchedOTP = bcrypt.compareSync(otp, otpValue.otp);
    if (!isMatchedOTP)
      return res.status(400).json({ success: false, msg: "Invalid OTP." });

    const hashPassword = bcrypt.hashSync(password, 10);
    let restaurant = new Restaurant({
      email,
      password: hashPassword,
    });

    await restaurant.save();

    await OTP.findByIdAndDelete(otpValue._id);

    res.clearCookie("token");

    const token = jwt.sign(
      { id: restaurant._id, role: "RESTAURENT" },
      process.env.JWT_SECRECT,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    restaurant.password = undefined;

    res.json({
      success: true,
      msg: "Registration successful",
      user: restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({ success: false, msg: "Internal server error" });
  }
};

// Login Restuarant
exports.loginRestaurant = async (req, res) => {
  const { email, password } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, msg: err.array().at(0).msg });
  }

  try {
    let user = await Restaurant.findOne({ email });

    if (!user)
      return res.status(404).json({ success: false, msg: "User not exist" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });

    // if (!user.verified)
    //   return res
    //     .status(404)
    //     .json({ success: false, msg: "User is not active" });

    res.clearCookie("token");

    const token = jwt.sign(
      { id: user._id, role: "RESTAURENT" },
      process.env.JWT_SECRECT,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    user.password = undefined;

    res
      .status(200)
      .json({ success: true, msg: "User logged in successfully", user });
  } catch (error) {
    console.log(error);
    res.status(501).json({ success: false, msg: "Internal server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "Unauthorized access",
      });
    }

    const user = await Restaurant.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User does not exist",
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      msg: "User details fetched seccessfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      path: "/",
      expires: 0,
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      msg: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

// Get Citis
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find({}, "name");
    res.json({ success: true, cities });
  } catch (error) {
    console.log(error);
  }
};

exports.getRestaurantOfCity = async (req, res) => {
  let cityname = req.params?.city;
  cityname = cityname?.toLowerCase();

  try {
    let city = await City.findOne({ name: cityname });

    if (!city)
      return res.json({
        success: false,
        msg: "No restaurant found in your city!",
      });

    const restaurants = await Restaurant.find({ city: city._id });
    res.json({ success: true, restaurants });
  } catch (error) {
    console.log(error);
  }
};

exports.getRestaurant = async (req, res) => {
  let restaurant_id = req.params?.restaurant_id;

  try {
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant)
      return res.json({ success: false, msg: "No restaurant found" });
    res.json({ success: true, restaurant });
  } catch (error) {
    console.log(error);
  }
};

// add food
exports.addFood = async (req, res) => {
  const { id } = req.user;
  const { name, desc, img, price, type, category } = req.body;

  const file = req.file;

  // return console.log(name)

  try {
    const user = await User.findById(id);

    if (!user || user.role !== "restaurant_owner") {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized access!" });
    }

    const restaurant = await Restaurant.findById(user.restaurant);
    if (!restaurant)
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized access! 2" });

    const fileUri = dataURI(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    const food = new Food({
      restaurant: restaurant._id,
      name,
      desc,
      img: mycloud.secure_url,
      price,
      type,
      category,
    });

    await food.save();

    res.json({ success: true, msg: "Food added successfully", food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succcess: false, msg: "1 Internal server error" });
  }
};

exports.getFoodsOfRestaurant = async (req, res) => {
  const restaurant_id = req.params?.restaurant_id;

  try {
    const foods = await Food.find({ restaurant: restaurant_id });

    if (!foods)
      return res.status(404).json({ success: false, msg: "No items found" });

    res.json({ succcess: true, foods: foods.reverse() });
  } catch (error) {}
};

exports.getFoodById = async (req, res) => {
  const food_id = req.params?.food_id;

  try {
    const food = await Food.findById(food_id);

    if (!food)
      return res.status(404).json({ success: false, msg: "Item not found" });

    res.json({ success: true, food });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.user;
  const { food_id } = req.body;

  try {
    const user = await User.findById(id);

    if (!user || user.role !== "restaurant_owner") {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized access!" });
    }

    let food = await Food.findById(food_id);

    if (!food) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    food = await Food.findByIdAndDelete(food_id);

    res.json({ success: true, msg: "Item deleted successfully" });

    console.log(food);
  } catch (error) {
    console.log(error);
    res.status(500).json({ succcess: false, msg: "Internal server error" });
  }
};

exports.getOrder = async (req, res) => {
  const { id } = req.user;

  try {
    const order = await Order.find();

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
  }
};

exports.createAccount = async (req, res) => {
  try {
    const { name, location, city } = req.body;
    const { id } = req.user;

    if (!name || !location) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(400).json({
        success: false,
        msg: "Invalid user details",
      });
    }

    restaurant.name = name;
    restaurant.location = location;
    restaurant.city = city;

    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "dinnre-restaurants",
      });

      if (response) {
        restaurant.profile_img = response.secure_url;
      }

      fs.unlink(req.file.path);
    }

    await restaurant.save();

    res.status(200).json({
      success: true,
      msg: "Restaurant profile updated successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.addBankAccount = async (req, res) => {
  try {
    const { bankName, accountNo, ifsc, upi } = req.body;

    const { id } = req.user;

    if (!bankName || !accountNo || !ifsc || !upi) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(400).json({
        succcess: false,
        msg: "User does not exist",
      });
    }

    restaurant.bankName = bankName;
    restaurant.accountNo = accountNo;
    restaurant.ifsc = ifsc;
    restaurant.upi = upi;

    await restaurant.save();

    res.status(200).json({
      success: true,
      msg: "Restaurant bank details added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
