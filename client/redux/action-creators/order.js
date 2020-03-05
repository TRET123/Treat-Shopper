import {GET_USER_ORDER, ADD_PRODUCT} from '../action-types/order'

export const getUserOrder = userOrder => {
  return {
    type: GET_USER_ORDER,
    userOrder
  }
}

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}
