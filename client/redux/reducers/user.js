import {GET_USER, REMOVE_USER, UPDATE_USER} from '../action-types/user'

const inititalState = {}

export const user = (state = inititalState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case UPDATE_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}
