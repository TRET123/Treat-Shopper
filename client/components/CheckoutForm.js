import React, {Component} from 'react'
import axios from 'axios'
import Checkout from './Checkout'
// import { submitOrderThunk } from './redux/thunks'
import {connect} from 'react-redux'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

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
    return (
      <div className="row">
        <div>
          <div>
            <div className="container">
              <form
                onSubmit={this.handleSubmit}
                className="needs-validation"
                noValidate
              >
                <h1 className="check-heading">Checkout Form</h1>
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
                    <b>4</b>
                  </span>
                </h3>
                <br />

                <p>
                  <a href="#">Skittles</a> <span className="price">$1.29</span>{' '}
                </p>
                <p>
                  <a href="#">Sour Straws</a>{' '}
                  <span className="price">$1.29</span>{' '}
                </p>
                <p>
                  <a href="#">Nerds</a> <span className="price">$2.50</span>{' '}
                </p>
                <p>
                  <a href="#">Gushers</a> <span className="price">$2.99</span>{' '}
                </p>

                <p>
                  Total{' '}
                  <span className="total">
                    <b>$7.28</b>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CheckoutForm
