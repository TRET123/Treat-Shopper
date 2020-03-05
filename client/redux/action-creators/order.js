import {GET_USER_ORDER} from '../action-types/order'

export const getUserOrder = userOrder => {
  return {
    type: GET_USER_ORDER,
    userOrder
  }
}
