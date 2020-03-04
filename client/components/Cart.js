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
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_9766bfa7-3fcb-4f4c-9576-15e17ccc1044?wid=488&hei=488&fmt=pjpeg'
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
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_3d2a8073-36e6-4cec-8c8c-872639105820?wid=488&hei=488&fmt=pjpeg'
  }
]
import {Link} from 'react-router-dom'
// import {removeItem, addQuantity, subtractQuantity} from './actions/cartActions’
class Cart extends Component {
  constructor() {
    super()
    this.state = {cart: data}
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
  render() {
    let addedItems = this.state.cart.length ? (
      this.state.cart.map(item => {
        return (
          <li className="collection-item avatar" key={item.id}>
            <div className="item-img">
              <img src={item.imageUrl} alt={item.imageUrl} className="" />
            </div>
            <div className="item-desc">
              <span className="title">{item.title}</span>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <div className="add-remove">
                <Link to="/cart">
                  <button
                    type="submit"
                    className="material-icons"
                    onClick={() => {
                      this.handleAddQuantity(item.id)
                    }}
                  >
                    +
                  </button>
                </Link>
                <Link to="/cart">
                  <button
                    type="submit"
                    className="material-icons"
                    onClick={() => {
                      this.handleSubtractQuantity(item.id)
                    }}
                  >
                    -
                  </button>
                </Link>
              </div>
              <button
                type="submit"
                // className='waves-effect waves-light btn pink remove'
                onClick={() => {
                  this.handleRemove(item.id)
                }}
              >
                Remove
              </button>
            </div>
          </li>
        )
      })
    ) : (
      <p>Your cart is empty</p>
    )
    return (
      <div className="container">
        <div className="cart">
          <h5 className="title">Shopping Cart:</h5>
          <ul>{addedItems}</ul>
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
