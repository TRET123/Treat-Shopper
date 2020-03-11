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
          <div className="prod" key={product.id}>
            <div className="buttons">
              <span>
                <button
                  onClick={() => this.handleRemove(product.id)}
                  className="remove-button"
                  type="submit"
                >
                  Delete
                </button>
              </span>
            </div>
            <div className="product">
              <Link to={`/products/${product.id}`}>
                <span>{product.name}</span>
              </Link>
              <span>Price: {product.price} </span>
              <span>Inventory: {product.inventory} </span>
              <span>Calories: {product.calories} </span>
              <span>Type: {product.candyType} </span>
              <span>Image: {product.imageUrl} </span>
              <span>Description: {product.description} </span>
            </div>
          </div>
        )
      })
    ) : (
      <p>Your products are empty</p>
    )
    return (
      <div className="products">
        <div>
          <h5 className="title">
            All Products
            <div>{'          '}</div>
            <Link id="add-prod" to="/addproduct">
              Add Product
            </Link>
          </h5>

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
