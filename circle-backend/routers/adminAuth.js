const { Router } = require('express')
const { register, login, logout } = require('../controllers/adminAuth')
const { body } = require("express-validator")
const { AdminLoginInputValidation, AdminCreateUserInputValidation } = require('../middleware/inputValidation')
const router = Router()

router.post('/createUser', AdminCreateUserInputValidation, register)
router.post('/login', AdminLoginInputValidation, login)
router.get('/logout', logout)

module.exports = router