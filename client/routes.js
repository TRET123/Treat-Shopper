import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './redux/thunks/user'
import AllProducts from './components/AllProducts'
import AllUsers from './components/AllUsers'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import GuestCart from './components/GuestCart'
import CheckoutForm from './components/CheckoutForm'
import ConfirmationPage from './components/ConfirmationPage'
import UserProfile from './components/UserProfile'
import ManageProducts from './components/ManageProducts'
import AdminPage from './components/AdminPage'
import AddProduct from './components/AddProduct'
import UpdateProduct from './components/UpdateProduct'
import NotFound from './components/NotFound'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/guest" component={GuestCart} />
        <Route exact path="/checkout" component={CheckoutForm} />
        <Route
          exact
          path="/candies/:id"
          render={({match}) => <SingleProduct match={match} />}
        />
        <Route path="/candies" component={AllProducts} />

        {/* Issues/collisions for rendering NotFound page */}
        {/* <Route path="*" component={NotFound} /> */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route
              exact
              path="/confirmation_page"
              component={ConfirmationPage}
            />
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={CheckoutForm} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/users" component={AllUsers} />
            <Route exact path="/products" component={ManageProducts} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/addproduct" component={AddProduct} />
            <Route exact path="/products/:id" component={UpdateProduct} />
          </Switch>
        )}

        {isAdmin && (
          <Switch>
            {/* Routes placed here are only available if admin */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={CheckoutForm} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/admin/products" component={ManageProducts} />
            <Route exact path="/admin/users" component={AllUsers} />
            <Route exact path="/products/:id" component={UpdateProduct} />
            <Route exact path="/addproduct" component={AddProduct} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route path="/login" component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
