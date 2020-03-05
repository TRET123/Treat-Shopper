import {
  getUserOrder,
  addProduct,
  removeItem,
  decrementQty,
  incrementQty
} from '../action-creators/order'
import axios from 'axios'

export const getUserOrderThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/userOrder')

      dispatch(getUserOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addProductThunk = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/orders/addToOrder/${productId}`)
      dispatch(addProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

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
