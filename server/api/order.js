const router = require('express').Router()
const {Product, User, Order} = require('../db/models')

// get current orders
router.get('/', async (req, res, next) => {
  if (req.query.get === 'userOrder') return next()
  try {
    const orders = await Order.findAll({include: Product})
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// get order in progress associated to logged in user
// NOTE: this route has to come before the "get order by id route"
router.get('/userOrder', async (req, res, next) => {
  try {
    // logged in users only
    if (!req.user) return res.sendStatus(206)
    const user = await User.findByPk(req.user.id)
    const userOrder = await Order.findOne({
      where: {complete: false, userId: user.id},
      include: Product
    })

    userOrder ? res.json(userOrder) : res.json({})
  } catch (error) {
    next(error)
  }
})

// get order by id
router.get('/:orderId', async (req, res, next) => {
  try {
    // deny access to guest users
    if (!req.user) return res.sendStatus(401)

    const order = await Order.findByPk(req.params.orderId, {include: Product})

    // admins or owner or order only
    if (req.user.admin || order.userId === req.user.id) res.json(order)
    else res.sendStatus(401)
  } catch (error) {
    next(error)
  }
})

// create new order for logged in user
router.post('/createUserOrder', async (req, res, next) => {
  try {
    // logged in users only
    if (!req.user) return res.sendStatus(400)

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

router.post('/addToOrder/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (!req.user) return res.sendStatus(206)
    const user = await User.findByPk(req.user.id)
    const [order] = await Order.findOrCreate({
      where: {complete: false, userId: user.id}
    })
    await order.addProduct(product)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
