const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin, AdminOrSelf} = require('./security-middleware')

// admins only
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

// admins or self only
router.get('/:userId', AdminOrSelf, async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId)
    res.json(singleUser)
  } catch (error) {
    console.error('Error getting a single user')
    next(error)
  }
})

// admins only
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (error) {
    console.error('Error adding a user')
    next(error)
  }
})

// admins only
router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    console.error('Error deleting a user')
    next(error)
  }
})

// admin or self only
router.put('/:userId', AdminOrSelf, async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.userId)
    await userToUpdate.update({
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    res.json(userToUpdate)
  } catch (error) {
    console.error('Error updating a user')
    next(error)
  }
})

module.exports = router
