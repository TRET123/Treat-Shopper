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

export const deleteProduct = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch(deletedProduct(id))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateProduct = product => {
  console.log('product in update product', product)
  return async dispatch => {
    const {data} = await axios.put(`/api/products/${product.id}`, product)
    // const {data} = await axios.put(`/api/products/11`, product)
    dispatch(updatedProduct(data))
  }
}
