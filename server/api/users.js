const router = require('express').Router()
const {User} = require('../db/models')
const {isLoggedIn, isAdmin} = require('./security-middleware')

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'address', 'admin']
    })
    res.json(users)
  } catch (err) {
    console.error('Error getting all users')
    next(err)
  }
})

router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    const singleUser = await User.findByPk(id)

    res.send(singleUser)
  } catch (error) {
    console.error('Error getting a single user')
    next(error)
  }
})

// admins only
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.send(newUser)
  } catch (error) {
    console.error('Error adding a user')
    next(error)
  }
})

// admins only
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting a user')
    next(error)
  }
})

// admins only
router.put('/:userId', isAdmin, async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.userId)
    await userToUpdate.update(req.body)
    res.status(200).send(userToUpdate)
  } catch (error) {
    console.error('Error updating a user')
    next(error)
  }
})

module.exports = router
