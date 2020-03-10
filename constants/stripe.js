const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_E4cm5VssNSZuXfJrLSf7hd2D00cyzswUCt'
export default STRIPE_PUBLISHABLE
