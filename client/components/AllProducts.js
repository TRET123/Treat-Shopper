import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../redux/thunks/products'
import {SingleProduct} from './SingleProduct'

class AllProducts extends Component {
  async componentDidMount() {
    try {
      await this.props.getAllProducts()
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    const allProducts = this.props.allProducts
    return allProducts.length ? (
      <div>
        {allProducts.map(product => {
          return <SingleProduct key={product.id} product={product} />
        })}
      </div>
    ) : (
      <img src="/loading.gif" />
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
    getAllProducts: () => dispatch(getAllProductsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
