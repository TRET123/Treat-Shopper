import {GET_ALL_PRODUCTS, GET_SELECTED_PRODUCT} from '../action-types/products'

const initialState = {
  allProducts: [],
  selectedProduct: {}
}

export const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, allProducts: action.allProducts}
    case GET_SELECTED_PRODUCT:
      return {...state, selectedProduct: action.selectedProduct}
    default:
      return state
  }
}
