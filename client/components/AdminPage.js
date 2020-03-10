import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

export class AdminPage extends React.Component {
  render() {
    const {firstName} = this.props
    return (
      <div className="shopping-cart">
        {/* <h3 className="welcome"></h3> */}
        <h5 className="title">Welcome to the Admin Page, {firstName}</h5>
        <Link to="/users">All Users</Link>
        <Link to="/products">Manage Products</Link>
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

export default connect(mapState)(AdminPage)

/**
 * PROP TYPES
 */
AdminPage.propTypes = {
  firstName: PropTypes.string
}
