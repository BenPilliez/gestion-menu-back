const express = require('express')
const router = express.Router
const propController = require('../controllers/proposition')

router.get('/prop/', propController.propAll)
router.get('/prop/:day', propController.propGet)
router.post('/prop', propController.propCreate)
router.put('/prop/:id', propController.propUpdate)
router.delete('/prop/:id', propController.propDelete)
