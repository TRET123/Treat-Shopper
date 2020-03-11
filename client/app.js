import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
class App extends React.Component {
  componentDidMount() {
    if (!sessionStorage.guestCart) {
      sessionStorage.setItem('guestCart', '[]')
      sessionStorage.setItem('quantity', '{}')
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default App
