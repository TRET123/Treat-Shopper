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
    const user = await User.findByPk(req.session.passport.user)
    const userOrder = await Order.findOne({
      where: {complete: false, userId: user.id},
      include: Product
    })
    userOrder ? res.json(userOrder) : res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

// get order by id
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {include: Product})
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// create new order for logged in user
router.post('/createUserOrder', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.passport.user)
    const [order] = await Order.findOrCreate({
      where: {complete: false, userId: user.id}
    })
    await user.addOrder(order)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
