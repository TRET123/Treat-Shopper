const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  candyType: {
    type: Sequelize.STRING,
    allowNull: false
  },

  calories: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
