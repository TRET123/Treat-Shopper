import {GET_ALL_PRODUCTS, GET_SELECTED_PRODUCT} from '../action-types/products'

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
