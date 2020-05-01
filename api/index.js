const router = require('express').Router()
const crud = require('./crud')
const auth = require('./auth')
const item = require('./item')

router.use('/orders', crud(require('../model/orders.model')))
router.use('/items', item(require('../model/items.model')))
router.use('/auth', auth(require('../model/users.model')))

module.exports = router