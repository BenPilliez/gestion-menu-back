const express = require('express')
const router = express.Router
const userController = require('../controllers/usersController')
const {veriftoken} = require('../helpers/authHelper')
const multer = require('../helpers/multer-config')

router.get('/user/:id', veriftoken, userController.getUser)
router.put('/user/password/:id', veriftoken, multer, userController.updatePassword)
router.put('/user/avatar/:id', veriftoken, userController.updateUserAvatar)

module.exports = router
