import React, {Component} from 'react'
// import { submitOrderThunk } from './redux/thunks'
import {connect} from 'react-redux'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      cardholder: '',
      address: '',
      creditCardNum: '',
      CVV: '',
      city: '',
      zipcode: '',
      expYear: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    //   this.props.submitOrder(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      cardholder: '',
      address: '',
      creditCardNum: '',
      CVV: '',
      city: '',
      zipcode: '',
      expYear: ''
    })
  }

  // OG
  render() {
    return (
      <div className="row">
        <div>
          <div className="p65">
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <h1 className="check-heading">Checkout Form</h1>
                <div className="row">
                  <div className="p50">
                    <h4>Billing Address</h4>
                    <label htmlFor="firstName">
                      First Name:
                      <br />
                      <input
                        type="text"
                        name="firstName"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                        placeholder="John"
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
                        placeholder="jdd@treatshopper.com"
                      />
                    </label>
                    <br />

                    {/* <h4>Payment Info</h4> */}
                    <label htmlFor="cardholder">
                      Cardholder:
                      <br />
                      <input
                        type="text"
                        name="cardholder"
                        onChange={this.handleChange}
                        value={this.state.cardholder}
                        placeholder="John Dee Doe"
                      />
                    </label>
                    <br />

                    <label htmlFor="address">
                      Address:
                      <br />
                      <input
                        type="text"
                        name="address"
                        onChange={this.handleChange}
                        value={this.state.address}
                        placeholder="123 E. 82nd Street"
                      />
                    </label>
                    <br />

                    <label htmlFor="creditCardNum">
                      Credit Card Number:
                      <br />
                      <input
                        type="text"
                        name="creditCardNum"
                        onChange={this.handleChange}
                        value={this.state.creditCardNum}
                        placeholder="1111 2222 3333 4444"
                      />
                    </label>
                    <br />

                    <label htmlFor="CVV">
                      CVV:
                      <br />
                      <input
                        type="text"
                        name="CVV"
                        onChange={this.handleChange}
                        value={this.state.CVV}
                        placeholder="420"
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

                    <label htmlFor="expYear">
                      Exp Year:
                      <br />
                      <input
                        type="text"
                        name="expYear"
                        onChange={this.handleChange}
                        value={this.state.expYear}
                        placeholder="2022"
                      />
                    </label>
                    <br />
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

                <p>
                  <a href="#">Skittles</a> <span className="price">$1.50</span>{' '}
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
                <button type="submit" className="btn">
                  <b>Checkout</b>
                </button>
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
