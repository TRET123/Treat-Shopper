'use strict'

const db = require('../server/db')
const {User, Product, Order, Cart} = require('../server/db/models')
const faker = require('faker')

const instanceCount = 100
const users = []

// admin
users.push({
  email: 'tret@fs.com',
  password: '1234',
  admin: true,
  address: faker.fake('{{address.streetAddress}}'),
  lastName: faker.fake('{{name.lastName}}'),
  firstName: faker.fake('{{name.firstName}}')
})

// generating random users
for (let i = 0; i < instanceCount; i++) {
  const randomUser = {
    email: faker.fake('{{internet.email}}'),
    password: faker.fake('{{internet.password}}'),
    address: faker.fake('{{address.streetAddress}}'),
    lastName: faker.fake('{{name.lastName}}'),
    firstName: faker.fake('{{name.firstName}}')
  }

  users.push(randomUser)
}

// some dummy data for our products
const dummyCandies = [
  {
    name: 'Skittles',
    inventory: 100,
    price: 1.99,
    description: 'Taste the rainbow',
    candyType: 'Sour',
    calories: 100,
    imageUrl: '/images/candy3.png'
  },
  {
    name: 'KitKat',
    inventory: 150,
    price: 2.99,
    description: 'Make the most of your break',
    candyType: 'Chocolate',
    calories: 200,
    imageUrl: '/images/candy2.png'
  },
  {
    name: 'M&M',
    inventory: 90,
    price: 1.5,
    description: 'Melts in your mouth, not in your hand',
    candyType: 'Chocolate',
    calories: 150,
    imageUrl: '/images/candy1.png'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    dummyCandies.map(candy => {
      return Product.create(candy)
    })
  )

  const p1 = await Product.findByPk(1)
  const p2 = await Product.findByPk(2)
  const p3 = await Product.findByPk(3)

  const user = await User.findByPk(1)
  const order = await Order.create()

  await user.addOrder(order)

  await order.addProduct(p1)
  await order.addProduct(p2)
  await order.addProduct(p3)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
