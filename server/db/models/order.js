const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  orderTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Order
