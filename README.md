# Treat-Shopper

## Overview:

Treat-shopper is an application that allows users to purchase candy. In the all candies page, a user can view the entire inventory, or use the filter to filter by a specific category of candy (chocolate, sour, chewy).
![products image](/images/treat-shopper_products.png)

Each product can be clicked on to display additional information about the product. A product can be added to the cart using the ‘Add to Cart’ button. In the cart, users can increment, decrement or remove products, and the checkout process can be completed.

![cart image](/images/treat-shopper_cart.png)
If a guest user has added products to their cart and wishes to check out, they will be prompted to log in to complete the checkout process. When a guest user logs in or signs up, their cart will persist. Logged in users have access to their profile page, in which they can view and edit their contact information.

![profile](/images/treat-shopper_profile.png)
Admin users have access to the Admin Page, which allows them to view all users and add, remove and update products.

## Features

Passport and Google OAuth 2.0 API
We were able to implement the modular Passport strategy for authenticating Google users. Any guest with a valid Google account can easily sign in and checkout on our e-commerce website. We chose Passport.js for a few reasons: it is lightweight, supports our need of persistent sessions, and also gives us the ability to customize our authentication requests in the future.

### Stripe API

We chose the Stripe API as our third-party payment processor as it has an excellent set of developer tools, a simple and minimalistic user interface, and security of payment information.

## Set Up:

Fork and or clone this repository to your local machine.

Open project directory and run the psql command `createdb treat-shopper.`
This will create the PostgreSQL database used to store product and user information.

`Run npm run start-dev.`
This will start the server for our application in development mode.

On a seperate terminal, and while the server is still running, run
`npm run seed.`
This will seed the treat-shopper database with some dummy user and product information found in /script/seed.js.

Visit http://localhost:8080/ to view and interact with the application.

NOTE: Google authentication WILL NOT work with our secrets.js file. For security reasons, we have kept this file off of Github.

### Stack:

Treat Shopper was built using the PERN stack (PostgreSQL, Express.js, React.js, Node.js)

Front-end:
React.js for UI
Redux.js for state management
Bootstrap for styling/design

Back-end:
Express.js for creating RESTful API
PostgreSQL for a relational database
Sequelize.js ORM for interacting with database
Node.js for server

### Contributors:

Thomas Zhang
https://github.com/thomaszhang97

Rana Quadri
https://github.com/ranaq

Erick Canals
https://github.com/EC7495
