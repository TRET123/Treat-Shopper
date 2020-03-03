import {GET_USER, REMOVE_USER} from '../action-types/user'

const inititalState = {}

export const user = (state = inititalState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}
