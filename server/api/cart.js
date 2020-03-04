const router = require('express').Router()
const {Product, Cart, User, Order} = require('../db/models')

// get all items in cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll()
    res.json(cart)
  } catch (error) {
    console.error('Error getting all items in the carts')
    next(error)
  }
})

// increment or decrement product quantity in cart
router.put('/:productId/:action', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {productId: req.params.productId}
    })
    if (req.params.action === 'add') {
      await cart.update({quantity: cart.quantity + 1})
    } else if (req.params.action === 'remove') {
      cart.update({quantity: cart.quantity - 1})
      if (cart.quantity === 0) {
        const currentOrder = await Order.findByPk(cart.orderId)
        const productInCart = await Product.findByPk(req.params.productId)
        await currentOrder.removeProduct(productInCart)
      }
    } else if (req.params.action === 'delete') {
      const currentOrder = await Order.findByPk(cart.orderId)
      const productInCart = await Product.findByPk(req.params.productId)
      await currentOrder.removeProduct(productInCart)
    }
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
