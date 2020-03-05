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
      <div>
        <Link to={`/candies/${id}`} key={id}>
          <h1>{name}</h1>
          <img src={imageUrl} />
        </Link>

        <hr style={{margin: '1% 25% 40 25%'}} />

        <p>
          Description:
          <br />
          {description}
        </p>
        <br />

        <p>Price: {price}</p>
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
