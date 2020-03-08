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
      const response = await axios.get('/api/orders/userOrder')
      if (response.status !== 206) {
        dispatch(getUserOrder(response.data))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const addProductThunk = productId => {
  return async dispatch => {
    try {
      const response = await axios.post(`/api/orders/addToOrder/${productId}`)
      if (response.status !== 206) {
        dispatch(addProduct(response.data))
      } else {
        const {data} = await axios.get(`/api/products/${productId}`)
        if (!sessionStorage.guestCart.includes(`"id":${productId}`)) {
          data.quantity = 1
          const guestCart = [...JSON.parse(sessionStorage.guestCart), data]
          sessionStorage.setItem('guestCart', JSON.stringify(guestCart))
        }
      }
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
