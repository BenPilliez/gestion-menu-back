const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {verifToken} = require('../helpers/authHelper')

const resetAuthController = require('../controllers/passwordResetController')

router.post('/recover', resetAuthController.passwordRecover)
router.put('/reset/:token', resetAuthController.resetPassword)

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.get('/account',verifToken, authController.account)

module.exports = router
