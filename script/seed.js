'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')
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
    price: 199,
    description: 'Taste the rainbow',
    candyType: 'Sour',
    calories: 100,
    imageUrl: '/images/candy3.png'
  },
  {
    name: 'KitKat',
    inventory: 150,
    price: 299,
    description: 'Make the most of your break',
    candyType: 'Chocolate',
    calories: 200,
    imageUrl: '/images/candy2.png'
  },
  {
    name: 'M&M',
    inventory: 90,
    price: 150,
    description: 'Melts in your mouth, not in your hand',
    candyType: 'Chocolate',
    calories: 150,
    imageUrl: '/images/candy1.png'
  },
  {
    name: '100 Grand Candy Bar',
    imageUrl: '/images/candy5.png',
    inventory: 50,
    calories: 200,
    price: 125,
    description:
      'Ever wish you had 100 GRAND? Now you can, even if it is only crunchy chocolate covering soft, chewy caramel goodness. This candy bar will help you feel closer to a million bucks!',
    candyType: 'chocolate'
  },
  {
    name: '5th Avenue Candy Bar',
    imageUrl: '/images/candy4.png',
    inventory: 55,
    calories: 150,
    price: 150,
    description:
      'The crunchy peanut butter and creamy milk chocolate that has been a quintessential fan favorite for more than 75 years. Named after that fashionable street in New York City, you may feel quite fashion forward snacking on this tasty treat. You will want to have enough of this hard-to-find bar on hand.',
    candyType: 'chocolate'
  },
  {
    name: 'Airheads Blue Raspberry Taffy Bar',
    imageUrl: '/images/candy7.png',
    inventory: 100,
    calories: 50,
    price: 50,
    description:
      "You can't just listen to the blues. You can't just live the blues. Man, you've gotta taste the blues! And Airheads Blue Raspberry is the perfect way to do it! It's a soft and flavorful candy that'll get your tongue buzzing with a great big blue raspberry flavor. Each bar is individually wrapped, so you can stash them under your bed, in your locker, or in your top-secret candy drawer and dig in whenever you get that blue raspberry craving!",
    candyType: 'sour'
  },
  {
    name: 'Airheads Watermelon Taffy Bar ',
    imageUrl: '/images/candy6.png',
    inventory: 50,
    calories: 50,
    price: 50,
    description:
      'The nice people at Airheads have taken a delicious summertime treat and transformed it into a year-round, all-the-time, gotta-have-it candy! This amazingly soft taffy is so full of watermelon flavor, every bite will feel like the 4th of July. So when your friends catch you applying sunscreen in December and wearing flippers and a snorkel in January, make sure you have plenty of Airheads Watermelon to share with them. Then ask if anyone has a surfboard you can borrow.',
    candyType: 'sour'
  },
  {
    name: 'Chuckles Assorted Fruit Jelly Candy Bars',
    imageUrl: '/images/candy8.png',
    inventory: 30,
    calories: 90,
    price: 150,
    description:
      'It’s no joke! Chuckles are some of the best candies around. These chewy “bars” are actually a neat little row of five bite-sized jelly nuggets, all dusted with sugar and each in a unique fruit flavor! They’re perfectly poppable little chunks of pure bliss. You can share them with friends or bite them in half and stick them back together again to make up your own flavor combinations. If you’ve got a lot of self-control you can even eat one piece at the end of each day of the work week (how’s that for a sweet reward?). However you choose to enjoy them, chuckles are fun and fruity, so they’ll definitely become one of your favorites!',
    candyType: 'chewy'
  },
  {
    name: 'Clark Cups Peanut Butter Cups',
    imageUrl: '/images/candy9.png',
    inventory: 160,
    calories: 200,
    price: 150,
    description:
      "A new peanut butter cup from Boyer, the makers of Mallo Cups and Smoothie Cups. Clark Cups are a classic Boyer peanut butter cup filled with crunchy bits you'll remember from the original Clark candy bar.",
    candyType: 'chewy'
  },
  {
    name: 'Classic Original Coconut Patties',
    imageUrl: '/images/candy10.png',
    inventory: 160,
    calories: 200,
    price: 150,
    description:
      'These classic original coconut patties are made up of a smooth, shredded coconut texture that is then dipped in a rich dark chocolatey coating, making a perfect combination for coconut candy lovers.',
    candyType: 'chewy'
  },

  {
    name: 'Joyva Raspberry Joys',
    imageUrl: '/images/candy11.png',
    inventory: 90,
    calories: 140,
    price: 125,
    description:
      'These Joyva Raspberry Joys are a delicious treat from Brooklyn New York. Rich dark chocolate covers each of these raspberry jell bars.',
    candyType: 'chewy'
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
