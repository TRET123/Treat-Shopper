import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const onToken = (amount, description) => async token => {
  try {
    await axios.post({
      description,
      source: token.id,
      currency: 'USD',
      amount
    })

    console.log('SUCCESS!!!')
    // successPayment(data)
  } catch (error) {
    console.error(error)
  }
}

const Checkout = ({name, description, amount}) => {
  return (
    <StripeCheckout
      name={name}
      description={description}
      amount={amount}
      token={onToken(amount, description)}
      currency="USD"
      stripeKey={process.env.PUBLISHABLE}
    />
  )
}

export default Checkout
