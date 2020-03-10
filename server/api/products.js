const router = require('express').Router()
const Product = require('../db/models/product')
const {isAdmin} = require('./security-middleware')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (err) {
    console.error('Error getting all products')
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.prodcutId)
    res.send(singleProduct)
  } catch (error) {
    console.error('Error getting a single product')
    next(error)
  }
})

// admins only
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    console.error('Error adding a product')
    next(error)
  }
})

// admins only
router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    console.error('Error deleting a product')
    next(error)
  }
})

// admins only
router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.productId)
    await productToUpdate.update(req.body)

    res.json(productToUpdate)
  } catch (error) {
    console.error('Error updating a product')
    next(error)
  }
})

module.exports = router
