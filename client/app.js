import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import AllProducts from './components/AllProducts'

const App = () => {
  return (
    <div>
      <AllProducts />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
