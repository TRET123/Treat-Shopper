import React, {Component} from 'react'
import {getSelectedProductThunk} from '../redux/thunks/products'
import {addProductThunk, getUserOrderThunk} from '../redux/thunks/order'
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
    // random num
    function randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

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
          <h3 style={{maxHeight: '35px'}}>{name}</h3>
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
                  <div
                    onClick={evt => evt.target.classList.toggle('checked')}
                    className="stars"
                  >
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                  </div>
                  <span className="review-no">{randomNum(30, 80)} reviews</span>
                </div>
                <p className="product-description">
                  <i>'{description}'</i>
                </p>
                <h4 className="price">
                  current price: <span>${(price / 100).toFixed(2)}</span>
                </h4>
                <p className="vote">
                  <strong>{randomNum(80, 100)}%</strong> of buyers enjoyed this
                  product! <strong>{randomNum(30, 80)} votes</strong>
                </p>

                <div className="action">
                  <button
                    style={{
                      marginBottom: '8%'
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
                  <br />
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
    getSelected: id => dispatch(getSelectedProductThunk(id)),
    addProduct: id => dispatch(addProductThunk(id)),
    getUserOrder: () => dispatch(getUserOrderThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
