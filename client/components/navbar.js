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
            <Link to="/home">
              <i className="fas fa-home"></i>
              <br />
              <small>home</small>
            </Link>
            <Link to="/profile">
              <i className="fas fa-user-circle"></i>
              <br />
              <small>profile</small>
            </Link>{' '}
            <a href="#" onClick={handleClick}>
              <i className="fas fa-sign-out-alt"></i>
              <br />
              <small>logout</small>
            </a>
          </div>
        ) : (
          <div className="nav">
            {/* The navbar will show these links before you log in */}
            <Link to="/home">
              <i className="fas fa-home"></i>
              <br />
              <small>home</small>
            </Link>
            <Link to="/login">
              <i className="fas fa-sign-in-alt"></i>
              <br />
              <small>login</small>
            </Link>
            <Link to="/signup">
              <i className="fas fa-user-plus">
                <br />
                <small>signup</small>
              </i>
            </Link>
          </div>
        )}

        {/* Link to all Candies */}
        <Link to="/candies">
          <i className="fas fa-candy-cane"></i>
          <br />
          <small>candies</small>
        </Link>
        <Link to={isLoggedIn ? '/cart' : '/guest'}>
          <i className="fas fa-shopping-cart"></i>
          <br />
          <small>cart</small>
        </Link>
        <div>
          {isAdmin ? (
            <div>
              {/* if admin user show links to All Users and All Products*/}
              <Link to="/users">All Users</Link>
              <Link to="/products">All Products</Link>
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
