import axios from 'axios'
import {removeItem, decrementQty, incrementQty} from '../action-creators/cart'

export const removeItemThunk = (productId, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/remove/${productId}/${orderId}`)
      dispatch(removeItem(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const decrementQtyThunk = (productId, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/cart/decrement/${productId}/${orderId}`
      )
      dispatch(decrementQty(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const incrementQtyThunk = (productId, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/cart/increment/${productId}/${orderId}`
      )
      dispatch(incrementQty(data))
    } catch (error) {
      console.error(error)
    }
  }
}
