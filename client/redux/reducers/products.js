import {
  GET_ALL_PRODUCTS,
  GET_SELECTED_PRODUCT,
  UPDATE_PRODUCT,
  ADD_PRODUCT_ADMIN,
  DELETE_PRODUCT
} from '../action-types/products'

const initialState = {
  allProducts: [],
  selectedProduct: {}
}

export const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, allProducts: action.allProducts}
    case ADD_PRODUCT_ADMIN:
      return {...state, allProducts: [...state.allProducts, action.product]}
    case UPDATE_PRODUCT:
      return {...state, allProducts: action.product}
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          product => product.id !== action.productId
        )
      }
    case GET_SELECTED_PRODUCT:
      return {...state, selectedProduct: action.selectedProduct}
    default:
      return state
  }
}
