const router = require('express').Router()
const crud = require('./crud')

router.use('/orders', crud(require('../model/orders.model')))
router.use('/products', crud(require('../model/products.model')))

module.exports = router