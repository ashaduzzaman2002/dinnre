const { Router } = require("express");
const {
  register,
  login,
  logout,
  getProfile,
  handleDecline,
  handleVerify,
  getAllVerifiedRestaurents,
  getAllPendingRestaurents,
  getAllOrderDetails,
} = require("../controllers/admin");
const { body } = require("express-validator");
const {
  AdminLoginInputValidation,
  AdminCreateUserInputValidation,
} = require("../middleware/inputValidation");
const { validedUser } = require("../middleware/userValidation");
const router = Router();

// router.post('/createUser', AdminCreateUserInputValidation, register)
router.post("/login", AdminLoginInputValidation, login);
router.post("/register", AdminCreateUserInputValidation, register);
router.get("/logout", logout);
router.get("/user", validedUser, getProfile);
router.put("/verify/:userId", validedUser, handleVerify);
router.delete("/decline/:userId", validedUser, handleDecline);
router.get("/all/orders", validedUser, getAllOrderDetails);
router.get("/all/verified-restaurants", validedUser, getAllVerifiedRestaurents);
router.get("/all/pending-restaurants", validedUser, getAllPendingRestaurents);

module.exports = router;
