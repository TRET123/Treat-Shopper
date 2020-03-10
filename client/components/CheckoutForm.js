import React, {Component} from 'react'
import history from '../history'
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
      email: '',
      address: '',
      city: '',
      zipcode: ''
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

    console.log(this.state)
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      CVV: '',
      city: '',
      zipcode: ''
    })

    history.push('/confirmation_page')
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
                      First Name:
                      <br />
                      <input
                        type="text"
                        name="firstName"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                        placeholder="John"
                        className="form-control"
                        required
                      />
                    </label>
                    <br />

                    <label htmlFor="lastName">
                      Last Name:
                      <br />
                      <input
                        type="text"
                        name="lastName"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        placeholder="Doe"
                        className="form-control"
                        required
                      />
                    </label>
                    <br />

                    <label htmlFor="email">
                      Email:
                      <br />
                      <input
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        placeholder="fs@treatshopper.com"
                        className="form-control"
                        required
                      />
                    </label>
                    <br />

                    <h4>Shipping Information</h4>

                    <label htmlFor="address">
                      Address:
                      <br />
                      <input
                        type="text"
                        name="address"
                        onChange={this.handleChange}
                        value={this.state.address}
                        placeholder="123 E. 82nd Street"
                        className="form-control"
                        required
                      />
                    </label>
                    <br />

                    <label htmlFor="city">
                      City:
                      <br />
                      <input
                        type="text"
                        name="city"
                        onChange={this.handleChange}
                        value={this.state.city}
                        placeholder="NY"
                        className="form-control"
                        required
                      />
                    </label>
                    <br />

                    <label htmlFor="zipcode">
                      Zipcode:
                      <br />
                      <input
                        type="text"
                        name="zipcode"
                        onChange={this.handleChange}
                        value={this.state.zipcode}
                        placeholder="10021"
                      />
                    </label>
                    <br />

                    <h4>Payment Info</h4>
                    {/* STRIPE CHECKOUT COMPONENT */}
                    <Checkout
                      name="The Road to learn React"
                      description="Only the Book"
                      amount={1}
                    />
                  </div>
                </div>

                {/* <Link to="/confirmation_page"> */}
                <button
                  className="btn btn-success"
                  type="submit"
                  value="Submit"
                >
                  Submit
                </button>
                {/* </Link> */}
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

//   const mapDispatchToProps = dispatch => {
//     return {
//       addRobot: newRobot => dispatch(addRobotThunk(newRobot))
//     };
//   };

//   export default connect(null, mapDispatchToProps)(NewRobotForm);

export default CheckoutForm
