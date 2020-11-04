const express = require('express')
const router = express.Router()
const propController = require('../controllers/proposition')
const {verifToken} = require('../helpers/authHelper')

router.get('/',verifToken, propController.propAll)
router.get('/:day',verifToken, propController.propGet)
router.post('/',verifToken, propController.propCreate)
router.put('/:id',verifToken, propController.propUpdate)
router.delete('/:id',verifToken, propController.propDelete)

module.exports = router
