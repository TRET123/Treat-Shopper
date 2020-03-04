import axios from 'axios'
import {getCartProducts} from '../action-creators/cart'

export const getCartProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(getCartProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}
