import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import AllProducts from './components/AllProducts'
import CheckoutForm from './components/CheckoutForm'
import ConfirmationPage from './components/ConfirmationPage'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllProducts />
      <CheckoutForm />
    </div>
  )
}

export default App
