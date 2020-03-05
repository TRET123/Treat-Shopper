import {
  INCREMENT_QTY,
  DECREMENT_QTY,
  REMOVE_ITEM,
  GET_USER_ORDER,
  ADD_PRODUCT
} from '../action-types/order'

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

export const incrementQty = product => {
  return {
    type: INCREMENT_QTY,
    product
  }
}

export const decrementQty = product => {
  return {
    type: DECREMENT_QTY,
    product
  }
}

export const removeItem = product => {
  return {
    type: REMOVE_ITEM,
    product
  }
}
