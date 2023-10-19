const { body } = require("express-validator");

// User or Restaurant
exports.UserCreateUserInputValidation = [
  body("name")
    .isLength({ min: 4 })
    .withMessage("location contains atleast 4 character"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("password must be grater than 7 and less than 19"),
  body("location")
    .isLength({ min: 4 })
    .withMessage("location contains atleast 4 character"),
  body("cityName")
    .isLength({ min: 4 })
    .withMessage("location contains atleast 4 character"),
  body("profile_img").optional().default("avatar"),
];

exports.UserLoginInputValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("password must be grater than 7 and less than 19"),
];

// Admin
exports.AdminCreateUserInputValidation = [
  body("username").not().isEmpty().withMessage('Username is required.'),
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
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("password must be grater than 7 and less than 19"),
];
