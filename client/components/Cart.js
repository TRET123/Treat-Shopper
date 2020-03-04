import React, {Component} from 'react'
import {HashRouter, Route} from 'react-router-dom'
// import {  } from '../redux/index';
import {connect} from 'react-redux'
import Navbar from './navbar'
import Item from './CartItem'
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
import {Link} from 'react-router-dom'
// import {removeItem, addQuantity, subtractQuantity} from './actions/cartActions’
class Cart extends Component {
  constructor() {
    super()
    this.state = {cart: data}
    this.getCartTotal = this.getCartTotal.bind(this)
    this.getItemTotal = this.getItemTotal.bind(this)
  }
  //to remove the item completely
  // handleRemove = id => {
  //   this.props.removeItem(id)
  // }
  // //to add the quantity
  // handleAddQuantity = id => {
  //   this.props.addQuantity(id)
  // }
  // //to substruct from the quantity
  // handleSubtractQuantity = id => {
  //   this.props.subtractQuantity(id)
  // }
  getCartTotal = function() {
    return this.state.cart
      .reduce((acc, value) => {
        return acc + value.price
      }, 0)
      .toFixed(2)
    // console.log('get total', getCartTotal())
  }
  getItemTotal = function() {
    return this.state.cart.item.price * this.state.cart.item.quantity.toFixed(2)
    // console.log('get total', getCartTotal())
  }

  render() {
    let addedItems = this.state.cart.length ? (
      this.state.cart.map(item => {
        return (
          <div className="item" key={item.id}>
            <div className="buttons">
              <span>
                <button type="submit">x</button>
              </span>
            </div>
            <div className="image">
              <img src={item.imageUrl} />
            </div>

            <div className="description">
              <span>{item.name}</span>
            </div>
            <div className="quantity">
              <button className="plus-btn" type="submit" name="button">
                +
              </button>
              <input defaultValue={item.quantity} type="text" name="name" />
              <button className="minus-btn" type="button" name="button">
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
          {/* <hr /> */}
          <div className="cart-total">
            <span className="cart-total-2">
              {' '}
              Cart Total: ${this.getCartTotal()}
            </span>
            <button className="buttons" type="submit">
              Checkout
            </button>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    items: state.addedItems
    //addedItems: state.addedItems
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
