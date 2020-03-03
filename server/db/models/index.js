const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Cart = require('./cart')

User.hasMany(Order)
Order.belongsTo(User, {as: 'user'})

Product.belongsToMany(Order, {through: Cart})
Order.belongsToMany(Product, {through: Cart})

// Order.hasMany(Product)

module.exports = {
  User,
  Product,
  Order,
  Cart
}
