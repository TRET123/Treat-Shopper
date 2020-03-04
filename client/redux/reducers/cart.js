import {GET_CART_PRODUCTS} from '../action-types/cart'

const initialState = {
  cartProducts: []
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return {...state, cartProducts: action.cartProducts}
    default:
      return state
  }
}
