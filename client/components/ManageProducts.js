import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getAllProductsThunk,
  updateProduct,
  deleteProduct
} from '../redux/thunks/products'

export class ManageProducts extends React.Component {
  constructor() {
    super()
    this.handleRemove = this.handleRemove.bind(this)
  }
  async componentDidMount() {
    try {
      await this.props.getAllProducts()
    } catch (error) {
      console.error(error)
    }
  }
  handleRemove = id => {
    this.props.deleteProduct(id)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const product = {
      id: this.state.id,
      name: this.state.name || '',
      inventory: this.state.inventory || '',
      calories: this.state.calories || '',
      type: this.state.type,
      imageUrl: this.state.imageUrl,
      description: this.state.description
    }

    this.props.updateUser(product)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    const allProducts = this.props.allProducts ? (
      this.props.allProducts.map(product => {
        return (
          <div key={product.id}>
            <div className="product">
              <span>Name: {product.name}</span>
              <span>Price: {product.price} </span>
              <span>Inventory: {product.inventory} </span>
              <span>Calories: {product.calories} </span>
              <span>Type: {product.candyType} </span>
              <span>Image URL: {product.imageUrl} </span>
              <span>Desription: {product.description} </span>
              <span key={product.id}>
                <button
                  key={product.id}
                  onClick={() => this.handleRemove(product.id)}
                  className="remove-button"
                  type="submit"
                >
                  x
                </button>
              </span>
            </div>
          </div>
        )
      })
    ) : (
      <p>Your products are empty</p>
    )
    return (
      <div className="products">
        <Link to="/addproduct">Add Product</Link>
        <div>
          <h5 className="title">All Products</h5>
          <ul>{allProducts}</ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk()),
    updateProduct: (id, description, inventory, price, calories, type) =>
      dispatch(
        updateProduct(id, description, inventory, price, calories, type)
      ),
    deleteProduct: id => {
      dispatch(deleteProduct(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts)
