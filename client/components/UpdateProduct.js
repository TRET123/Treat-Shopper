import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSelectedProductThunk, updateProduct} from '../redux/thunks/products'

class UpdateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // id: this.props.product.id || '',
      name: this.props.product.name || '',
      inventory: this.props.product.inventory || '',
      calories: this.props.product.calories || '',
      imageUrl: this.props.product.imageUrl || '',
      description: this.props.product.description || '',
      price: this.props.product.price || ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    try {
      if (this.props.match)
        await this.props.getSelected(this.props.match.params.id)
    } catch (error) {
      console.error(error)
    }
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const product = {
      id: this.props.product.id,
      name: this.state.name || '',
      inventory: this.state.inventory || '',
      calories: this.state.calories || '',
      price: this.state.price || '',
      imageUrl: this.state.imageUrl || '',
      description: this.state.description || ''
    }
    this.props.updateProduct(product)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const isEnabled = this.state.name.length > 0
    return (
      <div className="user-profile">
        <h5 className="title"> Product to Update </h5>
        <hr />
        <div className="user-profile-items">
          <div className="user-profile-item">
            Name
            <input
              placeholder={this.props.product.name}
              className="user-profile-input"
              name="name"
              type="string"
              value={this.state.name}
              onChange={evt => this.setState({name: evt.target.value})}
            />
          </div>
          <div className="user-profile-item">
            Description
            <input
              className="user-profile-input"
              placeholder={this.props.product.description}
              name="name"
              type="string"
              value={this.state.description}
              onChange={evt => this.setState({description: evt.target.value})}
            />
          </div>
          <div className="user-profile-item">
            inventory
            <input
              className="user-profile-input"
              placeholder={this.props.product.inventory}
              name="inventory"
              type="number"
              value={this.state.inventory}
              onChange={evt => this.setState({inventory: evt.target.value})}
            />
          </div>
          <div className="user-profile-item">
            Calories
            <input
              className="user-profile-input"
              placeholder={this.props.product.calories}
              name="name"
              type="number"
              value={this.state.calories}
              onChange={evt => this.setState({calories: evt.target.value})}
            />
          </div>
          <div className="user-profile-item">
            Price
            <input
              className="user-profile-input"
              placeholder={this.props.product.price}
              name="name"
              type="number"
              value={this.state.price}
              onChange={evt => this.setState({price: evt.target.value})}
            />
          </div>
          <div className="user-profile-item">
            Image Url
            <input
              className="user-profile-input"
              placeholder={this.props.product.imageUrl}
              name="name"
              type="string"
              value={this.state.imageUrl}
              onChange={evt => this.setState({imageUrl: evt.target.value})}
            />
          </div>
        </div>

        <div id="user-profile-update-div">
          <button
            id="user-profile-update-btn"
            disabled={!isEnabled}
            type="submit"
            onClick={this.handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    product: state.products.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSelected: id => dispatch(getSelectedProductThunk(id)),

    updateProduct: product => dispatch(updateProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
