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

// some dummy data for our products
const dummyCandies = [
  {
    name: 'Skittles',
    inventory: 100,
    price: 1.99,
    description: 'Taste the rainbow',
    candyType: 'Sour',
    calories: 100,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_3d2a8073-36e6-4cec-8c8c-872639105820?wid=488&hei=488&fmt=pjpeg'
  },
  {
    name: 'KitKat',
    inventory: 150,
    price: 2.99,
    description: 'Make the most of your break',
    candyType: 'Chocolate',
    calories: 200,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_9766bfa7-3fcb-4f4c-9576-15e17ccc1044?wid=488&hei=488&fmt=pjpeg'
  },
  {
    name: 'M&M',
    inventory: 90,
    price: 1.5,
    description: 'Melts in your mouth, not in your hand',
    candyType: 'Chocolate',
    calories: 150,
    imageUrl:
      'http://www.ocsaccess.com/admin/clientfiles/ucsne/images/xlarge/mm%20choc.jpg'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      users.map(user => {
        return Users.create(user)
      })
    )

    await Promise.all(
      dummyCandies.map(candy => {
        return Products.create(candy)
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
