// require database and User and Products model
const Users = require('./server/db/models/user')
const Products = require('./server/db/models/product')
const Orders = require('./server/db/models/order')
const faker = require('faker')

// first name faker.fake('{{name.firstName}}')
// last name faker.fake('{{name.lastName}}')
// email faker.fake('{{internet.email}}')
// password faker.fake('{{internet.password}}'
// address faker.fake('{{address.streetAddress}}')
// admin faker.fake('{{random.boolean}}')

// const seed = async () => {
//   try {
//     await db.sync({ force: true });

//     await Promise.all(
//       robots.map(robot => {
//         return Robot.create(robot);
//       })
//     );

//     await Promise.all(
//       projects.map(project => {
//         return Project.create(project);
//       })
//     );

//     const robotsArr = await Robot.findAll();
//     const projectsArr = await Project.findAll();

//     for (let i = 0; i < robots.length; i++) {
//       await robotsArr[i].setProjects(projectsArr);
//       await projectsArr[i].setRobots(robotsArr);
//     }

//     // seed your database here!
//   } catch (err) {
//     console.log(red(err));
//   }
// };

// module.exports = seed
// // If this module is being required from another module, then we just export the
// // function, to be used as necessary. But it will run right away if the module
// // is executed directly (e.g. `node seed.js` or `npm run seed`)
// if (require.main === module) {
//   seed()
//     .then(() => {
//       console.log(green('Seeding success!'))
//       db.close()
//     })
//     .catch(err => {
//       console.error(red('Oh noes! Something went wrong!'))
//       console.error(err)
//       db.close()
//     })
// }
