const express = require('express')
const router = express.Router()
const notificationsController = require('../controllers/notifications')
const {verifToken} = require('../helpers/authHelper')


router.get('/',verifToken, notificationsController.get_notifications)
router.delete('/:prop_id',verifToken, notificationsController.delete_notifications)

module.exports = router
