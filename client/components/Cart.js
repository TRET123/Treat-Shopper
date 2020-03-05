import React, {Component} from 'react'
import {
  removeItemThunk,
  decrementQtyThunk,
  incrementQtyThunk
} from '../redux/thunks/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CheckoutForm from './CheckoutForm'
import {getUserOrderThunk} from '../redux/thunks/order'

class Cart extends Component {
  constructor() {
    super()
    // this.state = {cart: data}
    this.getCartTotal = this.getCartTotal.bind(this)
    this.getItemTotal = this.getItemTotal.bind(this)
    this.handleAddQuantity = this.handleAddQuantity.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove = (productid, orderid) => {
    this.props.removeItem(productid, orderid)
  }

  handleAddQuantity = (productid, orderid) => {
    this.props.addQuantity(productid, orderid)
  }

  handleSubtractQuantity = (productid, orderid) => {
    this.props.subtractQuantity(productid, orderid)
  }

  getCartTotal = function() {
    return this.props.items
      .reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)
      .toFixed(2)
  }
  getItemTotal = function() {
    return (
      this.props.items.cart.price * this.props.items.cart.quantity.toFixed(2)
    )
  }

  render() {
    let addedItems = this.props.items.length ? (
      this.props.items.map(item => {
        return (
          <div className="item" key={item.id}>
            <div className="buttons">
              <span>
                <button
                  onClick={() =>
                    this.handleRemove(item.id, item.orderItem.orderId)
                  }
                  className="remove-button"
                  type="submit"
                >
                  x
                </button>
              </span>
            </div>
            <div className="image">
              <img src={item.imageUrl} />
            </div>

            <div className="description">
              <span className="description">{item.name}</span>
            </div>
            <div className="quantity">
              <button
                onClick={() =>
                  this.handleAddQuantity(item.id, item.orderItem.orderId)
                }
                className="buttons"
                type="submit"
                name="button"
              >
                +
              </button>
              <input defaultValue={item.quantity} type="text" name="name" />
              <button
                onClick={() =>
                  this.handleSubtractQuantity(item.id, item.orderItem.orderId)
                }
                className="buttons"
                type="submit"
                name="button"
              >
                -
              </button>
            </div>
            <div className="total-price">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <hr />
          </div>
        )
      })
    ) : (
      <p>Your cart is empty</p>
    )
    return (
      <div className="shopping-cart">
        <div>
          <h5 className="title">Shopping Cart</h5>
          <ul>{addedItems}</ul>
        </div>
        <div className="quantity">
          <div className="cart-total">
            <span className="cart-total-2">
              Cart Total: ${this.getCartTotal()}
            </span>
            <Link to="/checkout">
              <button type="button">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    items: state.cart.cart
  }
}
const mapDispatchToProps = dispatch => {
  return {
    removeItem: (productid, orderid) => {
      dispatch(removeItemThunk(productid, orderid))
    },
    addQuantity: (productid, orderid) => {
      dispatch(incrementQtyThunk(productid, orderid))
    },
    subtractQuantity: (productid, orderid) => {
      dispatch(decrementQtyThunk(productid, orderid))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
