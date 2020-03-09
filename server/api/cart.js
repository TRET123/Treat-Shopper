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

router.put('/:guestCart/:productQuantity', async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      where: {userId: req.user.id, complete: false}
    })
    const guestCart = req.params.guestCart
    const productQuantity = req.params.productQuantity
    let orderItem
    for (let i = 0; i < guestCart.length; i++) {
      await userOrder.addProduct(guestCart[i])
      if (productQuantity[guestCart[i].id] > 1) {
        orderItem = await OrderItem.findOne({
          where: {productId: guestCart[i].id, orderId: userOrder.id}
        })
        await orderItem.update({quantity: productQuantity[guestCart[i].id]})
      }
    }
    res.json(orderItem)
  } catch (error) {
    next(error)
  }
})

router.get('/:args', (req, res) => {
  // const e = JSON.parse(req.query.guest)
  // console.log('e:', e)
  res.send(req.params.args)
})

module.exports = router
