const router = require('express').Router()
const Product = require('../db/models/product')
const Cart = require('../db/models/cart')
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
    const cart = await Cart.findAll({include: Product})
    res.json(cart)
  } catch (error) {
    console.error('Error getting all items in the carts')
    next(error)
  }
})

// add to cart
router.put('/:userId/:productId/:action', async (req, res, next) => {
  try {
    const userCart = await Cart.findOne({where: {userId: req.params.userId}})
    const product = await Product.findByPk(req.params.productId)

    if (req.params.action === 'add') {
      await userCart.addProduct(product)
      await userCart.update({quantity: userCart.quantity + 1})
      res.json(userCart)
    } else if (req.params.action === 'remove') {
      await userCart.removeProduct(product)
      await userCart.update({quantity: userCart.quantity - 1})
      res.json(userCart)
    }
  } catch (error) {
    console.error('Error updating cart')
    next(error)
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
