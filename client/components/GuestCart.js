import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class GuestCart extends Component {
  constructor() {
    super()
    this.getCartTotal = this.getCartTotal.bind(this)
    this.handleAddQuantity = this.handleAddQuantity.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.state = {
      guestCart: []
    }
  }

  async componentDidMount() {
    const response = await axios.get('/api/orders/userOrder')
    if (response.status === 206) {
      this.setState({
        guestCart: JSON.parse(sessionStorage.guestCart)
      })
    }
  }

  handleRemove(productId) {
    this.setState({
      guestCart: this.state.guestCart.filter(product => {
        return productId !== product.id
      })
    })
  }

  handleAddQuantity(productId) {
    this.setState({
      guestCart: this.state.guestCart.map(product => {
        if (productId === product.id) product.quantity += 1
        return product
      })
    })
  }

  handleSubtractQuantity(productId) {
    this.setState({
      guestCart: this.state.guestCart.map(product => {
        if (productId === product.id) product.quantity -= 1
        return product
      })
    })
  }
  // add logic if dec qty to zero then remove product from cart
  getCartTotal() {
    if (this.state.guestCart.length) {
      return this.state.guestCart
        .reduce((acc, item) => {
          return acc + (item.price / 100) * item.quantity
        }, 0)
        .toFixed(2)
    }
  }

  render() {
    const addedItems = this.state.guestCart.length ? (
      this.state.guestCart.map(item => {
        return (
          <div className="item" key={item.id}>
            <div className="buttons">
              <span>
                <button
                  onClick={() => this.handleRemove(item.id)}
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
                onClick={() => this.handleAddQuantity(item.id)}
                className="buttons"
                type="submit"
                name="button"
              >
                +
              </button>

              <input placeholder={item.quantity} type="text" name="name" />
              <button
                onClick={() =>
                  item.quantity > 1
                    ? this.handleSubtractQuantity(item.id)
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
              ${((item.price / 100) * item.quantity).toFixed(2)}
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
