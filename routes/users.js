const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersController')
const {verifToken} = require('../helpers/authHelper')
const multer = require('../helpers/multer-config')

router.get('/user/:id', verifToken, userController.getUser)
router.put('/user/password/:id', verifToken, multer, userController.updatePassword)
router.put('/user/avatar/:id', verifToken, userController.updateUserAvatar)

module.exports = router
