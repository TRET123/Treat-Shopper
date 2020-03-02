// require database and User and Products model
const faker = require('faker')

console.log('here:')
console.log(faker.fake('{{name.firstName}} {{name.lastName}}'))
