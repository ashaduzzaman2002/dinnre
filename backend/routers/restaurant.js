const {
  registerRestaurant,
  getCities,
  getRestaurantOfCity,
  addFood,
  getFoodsOfRestaurant,
  getFoodById,
  deleteItem,
  getOrder,
  getRestaurantById,
  getMenuOfARestaurant,
  loginRestaurant,
  sendOTP,
  getProfile,
  logout,
  createAccount,
  addBankAccount,
  getMenu,
  getPendingOrders,
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


router.get("/all-orders", validedUser, getOrder);
router.get("/pending-orders", validedUser, getPendingOrders);

router.get("/cities", getCities);
router.get("/:city/all", getRestaurantOfCity);
router.get("/restaurant/:id", getRestaurantById);
router.get("/restaurant/items/:id", getMenuOfARestaurant);

router.post("/item/delete", validedUser, deleteItem);
router.get("/restaurant/:restaurant_id/foods", getFoodsOfRestaurant);
router.get("/food/items/:food_id", getFoodById);


module.exports = router;
