import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../redux/thunks/products'
import axios from 'axios'
class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      inventory: '',
      price: '',
      calories: '',
      candyType: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const product = {
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      inventory: this.state.inventory,
      price: this.state.price,
      calories: this.state.calories,
      candyType: this.state.candyType
    }
    // make a post request to database directly
    // await axios.post('/api/products', product)
    this.props.addProduct(product)
    this.setState({
      name: '',
      imageUrl: '',
      description: '',
      inventory: '',
      price: '',
      calories: '',
      candyType: ''
    })
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const isEnabled =
      this.state.name.length > 0 &&
      this.state.description.length > 10 &&
      this.state.price > 0 &&
      this.state.calories > 0

    return (
      <div className="shopping-cart">
        <div className="title">Add a New Product</div>
        <form onSubmit={this.handleSubmit}>
          <div className="product-form">
            Product Name{' '}
            <input
              // className="user-profile-item"
              type="text"
              // placeholder="Name"
              value={this.state.name}
              onChange={evt => this.setState({name: evt.target.value})}
            />
          </div>
          <div className="product-form">
            Description
            <input
              // className="user-profile-item"
              type="text"
              // placeholder="Description"
              value={this.state.description}
              onChange={evt => this.setState({description: evt.target.value})}
            />
          </div>
          <div className="product-form">
            Image Url
            <input
              // className="user-profile-item"
              type="text"
              // placeholder="Image URL"
              value={this.state.imageUrl}
              onChange={evt => this.setState({imageUrl: evt.target.value})}
            />
          </div>
          <div className="product-form">
            Inventory
            <input
              // className="user-profile-item"
              type="number"
              // placeholder="Inventory"
              value={this.state.inventory}
              onChange={evt => this.setState({inventory: evt.target.value})}
            />
          </div>
          <div className="product-form">
            Price
            <input
              // className="product-form"
              type="number"
              // placeholder="Price"
              value={this.state.price}
              onChange={evt => this.setState({price: evt.target.value})}
            />
          </div>

          <div className="product-form">
            Calories
            <input
              // className="user-profile-item"
              type="number"
              // placeholder="Calories"
              value={this.state.calories}
              onChange={evt => this.setState({calories: evt.target.value})}
            />
          </div>
          <button
            disabled={!isEnabled}
            type="submit"
            onClick={this.handleChange}
          >
            Add
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(addProduct(product))
  }
}
export default connect(null, {addProduct})(AddProduct)
