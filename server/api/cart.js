const router = require('express').Router()
const Cart = require('../db/models/cart')
const Product = require('../db/models/product')
const Order = require('../db/models/order')
const User = require('../db/models/user')

// router.get('/', async (req, res, next) => {
//   try {
//     const allCarts = await Cart.findAll()
//     res.json(allCarts)
//   } catch (err) {
//     console.error('Error getting all items in the carts')
//     next(err)
//   }
// })

router.get('/', async (req, res, next) => {
  try {
    const allCarts = await Order.findAll({where: {userId: 1}, include: Product})
    res.json(allCarts)
  } catch (err) {
    console.error('Error getting all items in the carts')
    next(err)
  }
})

// Need a route to serve all cart items associated with a given UserID
// router.get('/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id
//     const robot = await Cart.findByPk(id, {
//       include: [Project]
//     })

//     res.send(robot)
//   } catch (error) {
//     console.error('Error getting a single robot')
//     next(error)
//   }
// })

module.exports = router
