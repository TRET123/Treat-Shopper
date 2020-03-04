import axios from 'axios'
import {removeItem, decrementQty, incrementQty} from '../action-creators/cart'

export const removeItemThunk = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/${product.id}/remove`)
      dispatch(removeItem(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const decrementQtyThunk = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/${product.id}/decrement`)
      dispatch(decrementQty(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const incrementQtyThunk = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/${product.id}/increment`)
      dispatch(incrementQty(data))
    } catch (error) {
      console.error(error)
    }
  }
}
