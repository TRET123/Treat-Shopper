import {GET_CART} from '../action-types/cart'

const initialState = {
  cart: {}
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
