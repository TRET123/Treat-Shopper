import {INCREMENT_QTY, DECREMENT_QTY, REMOVE_ITEM} from '../action-types/cart'

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
