import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../redux/thunks/user'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div id="header">
    <nav>
      <div className="nav">
        {isLoggedIn ? (
          <div className="nav">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to={isLoggedIn ? '/cart' : '/guest'}></Link>
            <Link to="/profile">Profile</Link>{' '}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="nav">
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}

        {/* Link to all Candies */}
        <Link to="/candies">View All Candies</Link>
        <Link to={isLoggedIn ? '/cart' : '/guest'}>
          <i className="fas fa-shopping-cart"></i>
        </Link>
        <div>
          {isAdmin ? (
            <div>
              {/* if admin user show links to Admin page*/}

              <Link to="/admin">Admin</Link>
            </div>
          ) : (
            ' '
          )}
        </div>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool
}
