const Users = require('./server/db/models/user')
const Products = require('./server/db/models/product')
const Orders = require('./server/db/models/order')
const db = require('./server/db/db')
const faker = require('faker')

const instanceCount = 100
const users = []

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

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      users.map(user => {
        return Users.create(user)
      })
    )
  } catch (err) {
    console.error(err)
  }
}

module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error(err)
      db.close()
    })
}
