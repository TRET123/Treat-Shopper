import axios from 'axios'
import {
  getAllProducts,
  getSelectedProduct,
  addedProduct,
  deletedProduct,
  updatedProduct
} from '../action-creators/products'

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

export const addProduct = product => {
  return async dispatch => {
    const {data} = await axios.post('/api/products', product)
    dispatch(addedProduct(data))
  }
}

export const deleteProduct = product => {
  return async dispatch => {
    try {
      console.log('prod in delProd Thunk', product)
      const {data} = await axios.put(`/api/products/${product}`)
      dispatch(deletedProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateProduct = product => {
  return async dispatch => {
    const {data} = await axios.put(`/api/products/${product.id}`, product)
    dispatch(updatedProduct(data))
  }
}
