import {
  GET_USER,
  REMOVE_USER,
  UPDATE_USER,
  GET_USERS
} from '../action-types/user'

const inititalState = {users: [], user: {}}

export const user = (state = inititalState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_USERS:
      return {...state, users: action.users}
    case UPDATE_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}
