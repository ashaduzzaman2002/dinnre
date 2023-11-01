const { getMenu, getRestaurants, getRestaurantById } = require('../controllers/user');
const { checkout, paymentVerification } = require('../controllers/paymentController')


const Router = require('express').Router
const router = Router()


router.get("/menu", getMenu);
router.get("/restaurants", getRestaurants);
router.get("/restaurants/:id", getRestaurantById);

router.post('/payment/checkout', checkout)
router.post('/payment/verification', paymentVerification)

router.get("/api/getkey", (req, res) =>
  res.json({ success: true, key: process.env.RAZORPAY_API_KEY })
);

module.exports = router