const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')

User.hasOne(Cart)
Cart.belongsTo(User)
Cart.hasMany(Product)

module.exports = {
  User,
  Product,
  Cart
}
