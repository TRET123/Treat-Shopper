import React, {Component} from 'react'
import {
  removeItemThunk,
  decrementQtyThunk,
  incrementQtyThunk
} from '../redux/thunks/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CheckoutForm from './CheckoutForm'
const data = [
  {
    id: 1,
    quantity: 5,
    name: 'KitKat',
    inventory: 150,
    price: 2.99,
    description: 'Make the most of your break',
    candyType: 'Chocolate',
    calories: 200,
    imageUrl: './images/candy2.png'
  },
  {
    id: 2,
    quantity: 4,
    name: 'Skittles',
    inventory: 100,
    price: 1.99,
    description: 'Taste the rainbow',
    candyType: 'Sour',
    calories: 100,
    imageUrl: './images/candy3.png'
  }
]

class Cart extends Component {
  constructor() {
    super()
    // this.state = {cart: data}
    this.getCartTotal = this.getCartTotal.bind(this)
    this.getItemTotal = this.getItemTotal.bind(this)
    this.handleAddQuantity = this.handleAddQuantity.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.addQuantity = this.addQuantity.bind(this)
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
    return this.state.cart
      .reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)
      .toFixed(2)
  }
  getItemTotal = function() {
    return this.state.cart.item.price * this.state.cart.item.quantity.toFixed(2)
  }

  render() {
    let addedItems = this.state.cart.length ? (
      this.state.cart.map(item => {
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
