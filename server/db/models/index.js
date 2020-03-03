const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Cart = require('./cart')

Product.belongsToMany(Order, {through: 'cart'})
Order.belongsToMany(Product, {through: 'cart'})

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Product,
  Order,
  Cart
}
