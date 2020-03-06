import React, {Component} from 'react'
import {
  removeItemThunk,
  decrementQtyThunk,
  incrementQtyThunk,
  getUserOrderThunk
} from '../redux/thunks/order'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// have some local state called guestCart
// ex : this.state = { guestCart: [] }
// in componentDidMount, capture the response status
// ex: const response = await this.props.getUserOrder()
// if response.status is 206, set guestCart to JSON.parse(sessionStorage.guestCart)
// inside render method, check if there is something in this.state.guestCart
// if something in guesCart, render the products in the this.state.guestCart array
class Cart extends Component {
  constructor() {
    super()
    this.getCartTotal = this.getCartTotal.bind(this)
    this.handleAddQuantity = this.handleAddQuantity.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  async componentDidMount() {
    await this.props.getUserOrder()
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
  // add logic if dec qty to zero then remove product from cart
  getCartTotal = function() {
    if (this.props.items) {
      return this.props.items
        .reduce((acc, item) => {
          return (
            acc +
            (item.price / 100) * (item.orderItem ? item.orderItem.quantity : 0)
          )
        }, 0)
        .toFixed(2)
    }
  }

  render() {
    const addedItems = this.props.items ? (
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

              <input

                placeholder={item.orderItem ? item.orderItem.quantity : ''}
                type="text"
                name="name"
              />
              <button
                onClick={() =>
                  item.orderItem.quantity > 1
                    ? this.handleSubtractQuantity(
                        item.id,
                        item.orderItem.orderId
                      )
                    : this.handleRemove(item.id, item.orderItem.orderId)
                }
                className="buttons"
                type="submit"
                name="button"
              >
                -
              </button>
              <div className="total-price"></div>
            </div>
            <div className="total-price">
              $
              {(
                (item.price / 100) *
                (item.orderItem ? item.orderItem.quantity : 0)
              ).toFixed(2)}
            </div>
            <hr />
          </div>
        )
      })
    ) : (
      <p>Your cart is empty</p>
    )
    if (addedItems.length) {
      return true
    }
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
              <button disabled={!addedItems.length} type="button">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
// <button disabled={!this.state.value} />
const mapStateToProps = state => {
  return {
    items: state.order.userOrder.products
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
    },
    getUserOrder: () => {
      dispatch(getUserOrderThunk())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
