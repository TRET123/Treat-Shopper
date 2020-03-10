import React, {Component} from 'react'
import axios from 'axios'
import Checkout from './Checkout'

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      userOrder: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/orders/userOrder')
    this.setState({
      userOrder: data
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  // send total as well
  async handleSubmit(event) {
    event.preventDefault()
    await axios.put('/api/orders/completeOrder')
    this.setState({
      firstName: '',
      lastName: '',
      address: ''
    })
  }

  // OG
  render() {
    let total = 0
    const products = this.state.userOrder.products
    return products ? (
      <div className="row">
        <div>
          <div>
            <div className="container">
              <form
                onSubmit={this.handleSubmit}
                className="needs-validation"
                noValidate
              >
                <h1 className="check-heading">Checkout</h1>
                <div className="row">
                  <div className="p50">
                    <label htmlFor="firstName">
                      <input
                        type="text"
                        name="firstName"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                        placeholder="First Name"
                        className="form-control"
                        required
                      />
                    </label>
                    <br />

                    <label htmlFor="lastName">
                      {/* <br /> */}
                      <input
                        type="text"
                        name="lastName"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        placeholder="Last Name"
                        className="form-control"
                        required
                      />
                    </label>
                    <br />

                    <br />

                    <label htmlFor="address">
                      <input
                        type="text"
                        name="address"
                        onChange={this.handleChange}
                        value={this.state.address}
                        placeholder="Address"
                        className="form-control"
                        required
                      />
                    </label>
                    <br />
                    <br />
                    {/* STRIPE CHECKOUT COMPONENT */}
                    <Checkout
                      name="Treat Shopper"
                      description="Sweet Deals"
                      amount={1}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="p35">
              <div className="container">
                <h3>
                  Items in Cart:
                  <span className="price">
                    <i className="fa fa-shopping-cart"></i>
                  </span>
                </h3>
                <br />
                {products.map(product => {
                  total += product.price
                  return (
                    <div key={product.id}>
                      <p>
                        <a style={{color: '#3385ff'}}>{product.name}</a>{' '}
                        <span className="price">
                          {`$${(product.price / 100).toFixed(2)}`}
                        </span>{' '}
                      </p>
                    </div>
                  )
                })}
                <p>
                  Total{' '}
                  <span className="total">
                    <b>{`$${(total / 100).toFixed(2)}`}</b>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <img src="/images/loading.png" />
    )
  }
}
