import {GET_ALL_PRODUCTS, GET_SINGLE_PRODUCT} from '../action-types/products'

const initialState = {
  allProducts: [],
  singleProduct: {}
}

export const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, allProducts: action.allProducts}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.singleProduct}
    default:
      return state
  }
}
