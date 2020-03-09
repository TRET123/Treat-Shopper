import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

export class UserHome extends React.Component {
  async componentDidMount() {
    if (JSON.parse(sessionStorage.guestCart).length) {
      const guestCart = JSON.parse(sessionStorage.guestCart).reduce(
        (acc, current) => {
          acc += current.id
          return acc
        },
        ''
      )
      const quantity = Object.keys(JSON.parse(sessionStorage.quantity)).reduce(
        (acc, current) => {
          acc += JSON.parse(sessionStorage.quantity)[current]
          return acc
        },
        ''
      )
      await axios.put(`/api/cart/${guestCart}/${quantity}`)
    }
  }
  render() {
    const {firstName} = this.props
    return (
      <div>
        <h3 className="welcome">Welcome, {firstName}</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
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
