import {GET_ALL_PRODUCTS, GET_SINGLE_PRODUCT} from '../action-types/products'

export const getAllProducts = allProducts => {
  return {
    type: GET_ALL_PRODUCTS,
    allProducts
  }
}

export const getSingleProduct = singleProduct => {
  return {
    type: GET_SINGLE_PRODUCT,
    singleProduct
  }
}
