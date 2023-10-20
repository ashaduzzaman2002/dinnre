const { Router } = require('express')
const { register, login, logout, getProfile, handleDecline, handleVerify } = require('../controllers/admin')
const { body } = require("express-validator")
const { AdminLoginInputValidation, AdminCreateUserInputValidation } = require('../middleware/inputValidation')
const { validedUser } = require('../middleware/userValidation')
const router = Router()

// router.post('/createUser', AdminCreateUserInputValidation, register)
router.post('/login', AdminLoginInputValidation, login)
router.get('/logout', logout)
router.get('/user', validedUser, getProfile);
router.put('/verify/:userId', validedUser, handleVerify)
router.delete('/decline/:userId', validedUser, handleDecline)

module.exports = router