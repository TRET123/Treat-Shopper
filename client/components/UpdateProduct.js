import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSelectedProductThunk, updateProduct} from '../redux/thunks/products'

class UpdateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.product.id,
      name: this.props.product.name || '',
      inventory: this.props.product.inventory || '',
      calories: this.props.product.calories || '',
      type: this.props.product.type,
      imageUrl: this.props.product.imageUrl,
      description: this.props.product.description
    }
    // this.state = {
    //   id: 10,
    //   name: 'Classic Original Coconut Patties',
    //   inventory: 160,
    //   price: 150,
    //   description:
    //     'These classic original coconut patties are made up of a smooth, shredded coconut texture that is then dipped in a rich dark chocolatey coating, making a perfect combination for coconut candy lovers.',
    //   type: 'chewy',
    //   calories: 200,
    //   imageUrl: '/images/candy10.png'
    // }
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
      id: this.state.id,
      name: this.state.name || '',
      inventory: this.state.inventory || '',
      calories: this.state.calories || '',
      type: this.state.type,
      price: this.state.price,
      imageUrl: this.state.imageUrl,
      description: this.state.description
    }

    this.props.updateProduct(product)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const isEnabled =
      this.state.name.length > 0 && this.state.description.length > 0
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
              type="string"
              value={this.state.calories}
              onChange={evt => this.setState({calories: evt.target.value})}
            />{' '}
          </div>
          <div className="user-profile-item">
            Type
            <input
              className="user-profile-input"
              placeholder={this.props.product.type}
              name="name"
              type="string"
              value={this.state.type}
              onChange={evt => this.setState({type: evt.target.value})}
            />{' '}
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
            />{' '}
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
  console.log('state im mapState', state)
  return {
    product: state.products.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSelected: id => dispatch(getSelectedProductThunk(id)),

    updateProduct: (id, name, description, inventory, calories, imageUrl) =>
      dispatch(
        updateProduct(id, name, description, inventory, calories, imageUrl)
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
