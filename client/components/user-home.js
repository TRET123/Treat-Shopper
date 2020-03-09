import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

export class UserHome extends React.Component {
  async componentDidMount() {
    if (JSON.parse(sessionStorage.guestCart).length) {
      const guestCart = JSON.parse(sessionStorage.guestCart)
      const quantity = JSON.parse(sessionStorage.quantity)
//       await axios.put(`/api/cart/${guestCart}/${quantity}`)
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
