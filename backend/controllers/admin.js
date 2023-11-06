const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, msg: err.array()[0].msg });
  }

  try {
    let user = await Admin.findOne({ email });

    if (!user)
      return res.status(404).json({ success: false, msg: "User not exist" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });

    res.clearCookie("jwt");

    const token = await jwt.sign(
      { id: user._id, role: "ADMIN" },
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

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: errors.array()[0]?.msg });
    }

    let user = await Admin.findOne({ email });

    if (user) return res.json({ status: false, msg: "User already exist" });
    let hashPassword = await bcrypt.hash(password, 10);
    user = await Admin.create({ username, email, password: hashPassword });

    user.password = undefined;

    res.json({
      success: true,
      msg: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", msg: "User creation failed" });
  }
};

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

exports.getProfile = async (req, res) => {
  try {
    const { id, role } = req.user;

    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "Unauthorized access",
      });
    }

    const user = await Admin.findById(id);

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

exports.handleVerify = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id, role } = req.user;

    if (!userId) {
      return res.status(400).json({
        success: false,
        msg: "User id is invalid",
      });
    }

    if (role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        msg: "Unauthorized access denied",
      });
    }

    const user = await Restaurant.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User id is invalid",
      });
    }

    user.verified = true;

    await user.save();

    res.status(200).json({
      success: true,
      msg: "User is verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.handleDecline = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id, role } = req.user;

    if (!userId) {
      return res.status(400).json({
        success: false,
        msg: "User id is invalid",
      });
    }

    if (role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        msg: "Unauthorized access denied",
      });
    }

    const user = await Restaurant.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User does not exist",
      });
    }

    await Restaurant.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      msg: "User is verification declined successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getAllVerifiedRestaurents = async (req, res) => {
  try {
    const { role } = req.user;

    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    if (role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        msg: "Unauthorized, access denied",
      });
    }

    const restaurants = await Restaurant.find({
      verified: true,
      name: { $regex: new RegExp(search, "i") },
    })
      .skip(page * limit)
      .limit(limit)
      .select("-password");

    const total = await Restaurant.countDocuments({
      verified: true,
      name: { $regex: new RegExp(search, "i") },
    });

    res.status(200).json({
      success: true,
      msg: "All restaurents are fetched successfully",
      total,
      limit,
      page,
      search,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getAllPendingRestaurents = async (req, res) => {
  try {
    const { role } = req.user;
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    if (role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        msg: "Unauthorized, access denied",
      });
    }

    const restaurants = await Restaurant.find({
      verified: false,
      name: { $regex: new RegExp(search, "i") },
    })
      .skip(page * limit)
      .limit(limit)
      .select("-password");

    const total = await Restaurant.countDocuments({
      verified: false,
      name: { $regex: new RegExp(search, "i") },
    });

    res.status(200).json({
      success: true,
      msg: "All pending restaurents are fetched successfully",
      total,
      limit,
      page,
      search,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getAllOrderDetails = async (req, res) => {
  try {
    const { role } = req.user;
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    if (role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        msg: "Unauthorized, access denied",
      });
    }

    const orders = await Order.find({
      customerName: { $regex: new RegExp(search, "i") },
    })
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);

    const total = await Order.countDocuments({
      customerName: { $regex: new RegExp(search, "i") },
    });

    res.status(200).json({
      success: true,
      msg: "All orders are fetched successfully",
      total,
      limit,
      page,
      search,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
