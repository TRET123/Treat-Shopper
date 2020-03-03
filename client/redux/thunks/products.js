import axios from 'axios'
import {getAllProducts} from '../action-creators/products'

export const getAllProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}
