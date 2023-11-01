const express = require('express')
const { checkout, paymentVerification } = require('../controllers/paymentController')


const router = express.Router()

router.post('/payment/checkout', checkout)
router.post('/payment/verification', paymentVerification)


module.exports = router