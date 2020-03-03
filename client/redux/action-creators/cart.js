import {GET_CART_PRODUCTS} from '../action-types/cart'

export const getCartProducts = cartProducts => {
  return {
    type: GET_CART_PRODUCTS,
    cartProducts
  }
}
