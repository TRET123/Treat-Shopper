import {getUserOrder, addProduct} from '../action-creators/order'
import axios from 'axios'

export const getUserOrderThunk = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders/userOrder')
      if (!response.status === 206) {
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
      if (!response.status === 206) {
        dispatch(addProduct(response.data))
      } else {
        const {data} = await axios.get(`/api/products/${productId}`)
        if (!sessionStorage.guestCart.includes(`"id":${productId}`)) {
          const guestCart = [...JSON.parse(sessionStorage.guestCart), data]
          sessionStorage.setItem('guestCart', JSON.stringify(guestCart))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
}
