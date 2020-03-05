import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../redux/thunks/products'
import {addProductThunk, getUserOrderThunk} from '../redux/thunks/order'
import SingleProduct from './SingleProduct'

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      candyType: 'all'
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.setState({
      candyType: event.target.value
    })
  }

  async componentDidMount() {
    try {
      await this.props.getAllProducts()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    // const allProducts = this.props.allProducts
    let allProducts

    if (this.state.candyType !== 'all') {
      allProducts = this.props.allProducts.filter(
        product => product.candyType === this.state.candyType
      )
    } else {
      allProducts = this.props.allProducts
    }

    return (
      <div>
        <label htmlFor="fuelType">Filter by candy type: </label>
        <select onChange={this.onChange} value={this.state.fuelType}>
          <option value="all">All</option>
          <option value="gas">Sour</option>
          <option value="diesel">Chocolate</option>
          <option value="electric">Gummies</option>
        </select>

        <hr style={{margin: '1% 25% 40 25%'}} />

        {allProducts.length ? (
          <div>
            {allProducts.map(product => {
              return (
                <div key={product.id}>
                  <Link to={`/candies/${product.id}`}>
                    <SingleProduct key={product.id} product={product} />
                  </Link>
                  <button
                    type="submit"
                    className="buttons"
                    onClick={() => {
                      this.props.getUserOrder()
                      this.props.addProduct(product.id)
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <img src="/images/loading.gif" />
        )}
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
    addProduct: id => dispatch(addProductThunk(id)),
    getUserOrder: () => dispatch(getUserOrderThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
