import {GET_USER_ORDER} from '../action-types/order'

const initialState = {
  userOrder: {}
}

export const order = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDER:
      return {...state, userOrder: action.userOrder}
    default:
      return state
  }
}
