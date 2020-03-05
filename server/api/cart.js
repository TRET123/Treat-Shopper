const router = require('express').Router()
const {Product, OrderItem, Order} = require('../db/models')

// increment, decrement, or remove product quantity in cart
router.put('/:action/:productId/:orderId', async (req, res, next) => {
  try {
    // guest users do not have cart in database
    if (!req.user) return res.sendStatus(401)

    const orderItem = await OrderItem.findOne({
      where: {productId: req.params.productId, orderId: req.params.orderId}
    })
    const currentOrder = await Order.findByPk(orderItem.orderId)
    const productInCart = await Product.findByPk(orderItem.productId)

    // users can only edit their own cart
    if (currentOrder.userId !== req.user.id) return res.sendStatus(401)

    if (req.params.action === 'increment') {
      await orderItem.update({quantity: orderItem.quantity + 1})
    } else if (req.params.action === 'decrement') {
      orderItem.update({quantity: orderItem.quantity - 1})
      if (orderItem.quantity === 0) {
        await currentOrder.removeProduct(productInCart)
      }
    } else if (req.params.action === 'remove') {
      await currentOrder.removeProduct(productInCart)
    }

    res.json(productInCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
