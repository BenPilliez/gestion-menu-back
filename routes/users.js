const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersController')
const {verifToken} = require('../helpers/authHelper')
const multer = require('../helpers/multer-config')

router.get('/:id', verifToken, userController.getUser)
router.put('/password/:id', verifToken, multer, userController.updatePassword)
router.put('/avatar/:id', verifToken,multer, userController.updateUserAvatar)

module.exports = router
