import {REMOVE_ITEM, DECREMENT_QTY, INCREMENT_QTY} from '../action-types/cart'

const initialState = {
  cart: []
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.product.id)
      }
    case DECREMENT_QTY:
      return {
        ...state,
        cart: state.cart.map(product => {
          if (product.id === action.product.id) {
            product.cart.quantity -= 1
          }
          return product
        })
      }
    case INCREMENT_QTY:
      return {
        ...state,
        cart: state.cart.map(product => {
          if (product.id === action.product.id) {
            product.cart.quantity += 1
          }
          return product
        })
      }
    default:
      return state
  }
}
