import React, {Component} from 'react'
import {getSelectedProductThunk} from '../redux/thunks/products'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class SingleProduct extends Component {
  async componentDidMount() {
    try {
      if (this.props.match)
        await this.props.getSelected(this.props.match.params.id)
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    const product = this.props.product || this.props.selected
    const {
      id,
      name,
      imageUrl,
      description,
      inventory,
      price,
      calories,
      candyType
    } = product

    return product ? (
      product === this.props.product ? (
        <div id="singleProduct">
          <h1>{name}</h1>
          <div id="productImage">
            <Link to={`/candies/${product.id}`}>
              <img src={imageUrl} />
            </Link>
          </div>
          <p>${(price / 100).toFixed(2)}</p>
        </div>
      ) : (
        <div className="container">
          <div className="card" align="center">
            <div className="wrapper row">
              <div>
                <h3 className="product-title">{name}</h3>
                <div id="productImage">
                  <img src={imageUrl} />
                </div>
                <br />
              </div>

              <div>
                <div className="rating">
                  <div className="stars">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                  </div>
                  <span className="review-no">41 reviews</span>
                </div>
                <p className="product-description">{description}</p>
                <h4 className="price">
                  current price: <span>${(price / 100).toFixed(2)}</span>
                </h4>
                <p className="vote">
                  <strong>91%</strong> of buyers enjoyed this product!{' '}
                  <strong>(87 votes)</strong>
                </p>

                <div className="action">
                  <button className="add-to-cart btn btn-default" type="button">
                    add to cart
                  </button>
                  <button className="like btn btn-default" type="button">
                    <span className="fa fa-heart"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    ) : (
      <img src="/images/loading.gif" />
    )
  }
}

const mapStateToProps = state => {
  return {
    selected: state.products.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSelected: id => dispatch(getSelectedProductThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
