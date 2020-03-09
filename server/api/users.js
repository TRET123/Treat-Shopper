const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', async (req, res, next) => {
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

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const singleUser = await User.findByPk(id)

    res.send(singleUser)
  } catch (error) {
    console.error('Error getting a single user')
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // admins only
    if (!req.user || !req.user.admin) return res.sendStatus(401)
    const newUser = await User.create(req.body)
    res.send(newUser)
  } catch (error) {
    console.error('Error adding a user')
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    // admins only
    if (!req.user || !req.user.admin) return res.sendStatus(401)
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

router.put('/:id', async (req, res, next) => {
  try {
    // admins only
    if (!req.user || !req.user.admin) return res.sendStatus(401)
    const id = req.params.id
    const userToUpdate = await User.findByPk(id)
    await userToUpdate.update(req.body)

    res.status(200).send(userToUpdate)
  } catch (error) {
    console.error('Error updating a user')
    next(error)
  }
})

module.exports = router
