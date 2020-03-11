const router = require('express').Router()
const {Product, User, Order} = require('../db/models')
const {isAdmin, isLoggedIn} = require('./security-middleware')

// get current orders
router.get('/', isAdmin, async (req, res, next) => {
  // if request is for the logged in user's order, send to next route
  if (req.query.get === 'userOrder') return next()
  try {
    const orders = await Order.findAll({include: Product})
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// get self order
// NOTE: this route has to come before the "get order by id route"
router.get('/userOrder', async (req, res, next) => {
  try {
    // guest user, order is in session storage
    if (!req.user) return res.sendStatus(206)
    const userOrder = await Order.findOne({
      where: {complete: false, userId: req.user.id},
      include: Product
    })

    userOrder ? res.json(userOrder) : res.json({})
  } catch (error) {
    next(error)
  }
})

// get most recent completed order for logged in user
router.get('/recentOrder', isLoggedIn, async (req, res, next) => {
  const [recentOrder] = await Order.findAll({
    limit: 1,
    where: {complete: true, userId: req.user.id},
    order: [['createdAt', 'DESC']],
    include: Product
  })
  res.json(recentOrder)
})

// order history for logged in user
router.get('/orderHistory', isLoggedIn, async (req, res, next) => {
  const orderHistory = await Order.findAll({
    where: {complete: true, userId: req.user.id}
  })
  res.json(orderHistory)
})

// toggle order to complete
router.put('/completeOrder', isLoggedIn, async (req, res, next) => {
  try {
    const orderToUpdate = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })
    await orderToUpdate.update({
      complete: true
    })

    res.json(orderToUpdate)
  } catch (error) {
    next(error)
  }
})

// get order by id
router.get('/:orderId', isLoggedIn, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {include: Product})
    if (!req.user.admin || req.user.id !== order.userId)
      return res.sendStatus(401)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// create new order for logged in user
router.post('/createUserOrder', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const [order] = await Order.findOrCreate({
      where: {complete: false, userId: user.id}
    })

    await user.addOrder(order)

    res.json(order)
  } catch (error) {
    next(error)
  }
})

// add product to logged in user's order
router.post('/addToOrder/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    // guest user, add product to session storage
    if (!req.user) return res.sendStatus(206)
    const [order] = await Order.findOrCreate({
      where: {complete: false, userId: req.user.id}
    })
    await order.addProduct(product)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
