const { body } = require("express-validator");

// User or Restaurant
exports.OTPInputValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];

exports.UserCreateUserInputValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("password must be grater than 7 and less than 19"),
  body("otp")
    .not()
    .isEmpty()
    .withMessage("OTP is required")
    .isLength(5)
    .withMessage("OTP must be 4 digit"),
];

exports.UserLoginInputValidation = [
  body("email").not().isEmpty().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];

// Admin
exports.AdminCreateUserInputValidation = [
  body("username").not().isEmpty().withMessage("Username is required."),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

exports.AdminLoginInputValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];
