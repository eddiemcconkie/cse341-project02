const router = require('express').Router()
const controller = require('../controllers/contacts')

router.get('/', controller.getContacts)
router.get('/:id', controller.getContact)

module.exports = router
