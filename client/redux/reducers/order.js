import {GET_USER_ORDER, ADD_PRODUCT} from '../action-types/order'
// test
const initialState = {
  userOrder: {}
}

export const order = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDER:
      return {...state, userOrder: action.userOrder}
    case ADD_PRODUCT:
      // console.log('state', state, 'state products', state.userOrder.products)
      return {
        ...state,
        [state.products]: [...state.userOrder.products, action.product]
      }
    default:
      return state
  }
}