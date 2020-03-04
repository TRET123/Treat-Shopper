const router = require('express').Router()
const {Product, Cart, User, Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll()
    res.json(cart)
  } catch (error) {
    console.error('Error getting all items in the carts')
    next(error)
  }
})

router.put()

module.exports = router
