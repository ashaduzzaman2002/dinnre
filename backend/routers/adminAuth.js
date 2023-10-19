const { Router } = require('express')
const { register, login, logout, getProfile } = require('../controllers/adminAuth')
const { body } = require("express-validator")
const { AdminLoginInputValidation, AdminCreateUserInputValidation } = require('../middleware/inputValidation')
const { validedUser } = require('../middleware/userValidation')
const router = Router()

// router.post('/createUser', AdminCreateUserInputValidation, register)
router.post('/login', AdminLoginInputValidation, login)
router.get('/logout', logout)
router.get('/user', validedUser, getProfile);

module.exports = router