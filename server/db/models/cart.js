const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

module.exports = Cart
