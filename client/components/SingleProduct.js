import React, {Component} from 'react'
import {getSelectedProductThunk} from '../redux/thunks/products'
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

    return product ? (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} />
        <p>{product.description}</p>
      </div>
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
