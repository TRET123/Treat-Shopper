const router = require('express').Router()
const {Product, OrderItem, User, Order} = require('../db/models')

// send current orders

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// get order associated to user
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const order = await Order.findByPk(req.params.userId, {
      where: {complete: false},
      include: Product
    })
    await user.addOrder(order)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// create new order for user
router.post('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const [order] = await Order.findOrCreate({
      where: {userId: req.params.userId, complete: false}
    })
    await user.addOrder(order)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
