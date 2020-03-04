import axios from 'axios'
import {getAllProducts, getSelectedProduct} from '../action-creators/products'

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

export const getSelectedProductThunk = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(getSelectedProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}
