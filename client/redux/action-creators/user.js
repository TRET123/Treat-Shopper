import {GET_USER, REMOVE_USER} from '../action-types/user'

export const getUser = user => ({type: GET_USER, user})
export const removeUser = () => ({type: REMOVE_USER})
