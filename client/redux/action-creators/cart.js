import {GET_CART} from '../action-types/cart'

export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}
