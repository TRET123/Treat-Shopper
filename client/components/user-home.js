import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

export class UserHome extends React.Component {
  async componentDidMount() {
    if (JSON.parse(sessionStorage.guestCart).length) {
      const idArray = JSON.parse(sessionStorage.guestCart).reduce(
        (acc, current) => {
          acc.push(current.id)
          return acc
        },
        []
      )
      const qtyArray = Object.keys(JSON.parse(sessionStorage.quantity)).reduce(
        (acc, current) => {
          acc.push(JSON.parse(sessionStorage.quantity)[current])
          return acc
        },
        []
      )
      await axios.put('/api/cart/mergeCarts', {
        idArray,
        qtyArray
      })
    }
  }
  render() {
    const {firstName} = this.props
    return (
      <div>
        <h3 style={{marginLeft: '40%'}} className="welcome">
          Welcome {firstName ? firstName : 'stranger'}!
        </h3>
        <h2>Shop our wide variety of candies!</h2>
        <br />
        <img style={{width: '100%', height: '50%'}} src="/images/home.gif" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state)
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
