import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import history from '../history'

import STRIPE_PUBLISHABLE from '../../constants/stripe'
import PAYMENT_SERVER_URL from '../../constants/server'

const CURRENCY = 'USD'
const fromUSDToCent = amount => amount * 100

const successPayment = () => {
  history.push('/confirmation_page')
}

const errorPayment = () => {
  // eslint-disable-next-line no-alert
  alert('Payment Error')
}

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment)

const Checkout = ({name, description, amount}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
)
export default Checkout
