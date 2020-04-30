const router = require('express').Router()
const crud = require('./crud')
const auth = require('./auth')

router.use('/orders', crud(require('../model/orders.model')))
router.use('/products', crud(require('../model/products.model')))
router.use('/auth', auth(require('../model/users.model')))

module.exports = router