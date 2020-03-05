import React, {Component} from 'react'
// import {removeItem, addQuantity, subtractQuantity} from '../redux/index';
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
    this.state = {cart: data}
    this.getCartTotal = this.getCartTotal.bind(this)
    this.getItemTotal = this.getItemTotal.bind(this)
  }

  // handleRemove = id => {
  //   this.props.removeItem(id)
  // }

  // handleAddQuantity = id => {
  //   this.props.addQuantity(id)
  // }

  // handleSubtractQuantity = id => {
  //   this.props.subtractQuantity(id)
  // }
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
                <button className="remove-button" type="submit">
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
                className="btn btn-success btn-xs"
                type="submit"
                name="button"
              >
                +
              </button>
              <input defaultValue={item.quantity} type="text" name="name" />
              <button
                className="btn btn-danger btn-xs"
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
    items: state.addedItems
  }
}
const mapDispatchToProps = dispatch => {
  return {
    removeItem: id => {
      dispatch(removeItem(id))
    },
    addQuantity: id => {
      dispatch(addQuantity(id))
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
