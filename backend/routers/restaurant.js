const {
  registerRestaurant,
  getCities,
  getRestaurantOfCity,
  getRestaurant,
  addFood,
  getFoodsOfRestaurant,
  getFoodById,
  deleteItem,
  getOrder,
  getAllItem,
  getAllRestaurant,
  getRestaurantById,
  getMenuOfARestaurant,
  loginRestaurant,
  sendOTP,
  getProfile,
  logout,
  createAccount,
  addBankAccount,
  getMenu,
} = require("../controllers/restaurant");
const { validedUser } = require("../middleware/userValidation");
const singleUpload = require("../middleware/multer");
const checkImageUpload = require("../middleware/fileUpload");
const {
  UserCreateUserInputValidation,
  UserLoginInputValidation,
  OTPInputValidation,
} = require("../middleware/inputValidation");
const { body } = require("express-validator");

const Router = require("express").Router;
const router = Router();

router.post("/send-otp", OTPInputValidation, sendOTP);
router.post("/register", UserCreateUserInputValidation, registerRestaurant);
router.post("/login", UserLoginInputValidation, loginRestaurant);
router.get("/profile", validedUser, getProfile);
router.get("/logout", validedUser, logout);
router.put(
  "/create-account",
  validedUser,
  singleUpload,
  checkImageUpload,
  createAccount
);
router.put("/add-bank", validedUser, addBankAccount);

router.post("/add/food", validedUser, singleUpload, checkImageUpload, addFood);
router.get('/menu', validedUser, getMenu)

router.get("/get-all-item", getAllItem);
router.get("/all-restaurant", getAllRestaurant);

router.get("/cities", getCities);
router.get("/:city/all", getRestaurantOfCity);
router.get("/restaurant/:id", getRestaurantById);
router.get("/restaurant/items/:id", getMenuOfARestaurant);

router.post("/item/delete", validedUser, deleteItem);
router.get("/restaurant/:restaurant_id/foods", getFoodsOfRestaurant);
router.get("/food/items/:food_id", getFoodById);
router.get("/all-orders", validedUser, getOrder);
router.get("/pending-orders", validedUser, getOrder);

module.exports = router;
