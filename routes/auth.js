const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

const resetAuthController = require('../controllers/passwordResetController')

router.post('/recover', resetAuthController.passwordRecover)
router.put('/reset/:token', resetAuthController.resetPassword)

router.post('/signin', authController.login)
router.post('/signup', authController.signup)
router.get('/account', authController.account)

module.exports = router
