const router = require('express').Router()
const Product = require('../db/models/product')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (err) {
    console.error('Error getting all products')
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const singleProduct = await Product.findByPk(id)

    res.send(singleProduct)
  } catch (error) {
    console.error('Error getting a single product')
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // admins only
    if (!req.user || !req.user.admin) return res.sendStatus(401)
    const newProduct = await Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    console.error('Error adding a product')
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  let productToDelete = await Product.findByPk(req.params.id)
  if (productToDelete) {
    try {
      // admins only
      if (!req.user || !req.user.admin) return res.sendStatus(401)
      await Product.destroy({where: {id: req.params.id}})
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  } else {
    res.status(404).send()
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    // admins only
    if (!req.user || !req.user.admin) return res.sendStatus(401)
    const id = req.params.id
    const productToUpdate = await Product.findByPk(id)
    await productToUpdate.update(req.body)

    res.status(200).send(productToUpdate)
  } catch (error) {
    console.error('Error updating a product')
    next(error)
  }
})

module.exports = router
