import React, {Component} from 'react'
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
        <small>
          <strong>candy type</strong>
        </small>
        <br />
        <select onChange={this.onChange} value={this.state.candyType}>
          <option value="all">All</option>
          <option value="sour">Sour</option>
          <option value="chocolate">Chocolate</option>
          <option value="chewy">Chewy</option>
        </select>

        <hr style={{margin: '1% 25% 40 25%'}} />

        {allProducts.length ? (
          <div id="products">
            {allProducts.map(product => {
              return (
                <div key={product.id}>
                  <SingleProduct key={product.id} product={product} />

                  <button
                    style={{
                      marginBottom: '20%'
                    }}
                    type="submit"
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      this.props.getUserOrder()
                      this.props.addProduct(product.id)
                    }}
                  >
                    <i className="fas fa-cart-plus"></i>
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
