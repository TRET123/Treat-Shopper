import {
  GET_ALL_PRODUCTS,
  GET_SELECTED_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_PRODUCT_ADMIN
} from '../action-types/products'

export const getAllProducts = allProducts => {
  return {
    type: GET_ALL_PRODUCTS,
    allProducts
  }
}

export const getSelectedProduct = selectedProduct => {
  return {
    type: GET_SELECTED_PRODUCT,
    selectedProduct
  }
}

export const addedProduct = product => {
  return {
    type: ADD_PRODUCT_ADMIN,
    product
  }
}

export const updatedProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

export const deletedProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId
  }
}
