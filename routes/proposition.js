const express = require('express')
const router = express.Router()
const propController = require('../controllers/proposition')
const {verifToken} = require('../helpers/authHelper')
const multer = require('../helpers/multer-config-propositions')

router.get('/',verifToken, propController.propAll)
router.get('/:day',verifToken, propController.propGetWeekList)
router.get('/details/:id',verifToken, propController.propDetails)
router.post('/',verifToken,multer, propController.propCreate)
router.put('/:id',verifToken,multer, propController.propUpdate)
router.delete('/:id',verifToken, propController.propDelete)

module.exports = router
