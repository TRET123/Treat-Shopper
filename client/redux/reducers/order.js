import {
  GET_USER_ORDER,
  ADD_PRODUCT,
  REMOVE_ITEM,
  DECREMENT_QTY,
  INCREMENT_QTY
} from '../action-types/order'
const initialState = {
  userOrder: {}
}

export const order = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDER:
      return {...state, userOrder: action.userOrder}
    case ADD_PRODUCT:
      console.log('state products', state.userOrder.products)
      return {
        ...state,
        userOrder: {
          ...state.userOrder,
          products: [...state.userOrder.products, action.product]
        }
      }
    case REMOVE_ITEM:
      return {
        ...state,
        userOrder: {
          ...state.userOrder,
          products: state.userOrder.products.filter(
            product => product.id !== action.product.id
          )
        }
      }

    case DECREMENT_QTY:
      return {
        ...state,
        userOrder: {
          ...state.userOrder,
          products: [
            ...state.userOrder.products.map(product => {
              if (product.id === action.product.id) {
                return {
                  ...product,
                  orderItem: {
                    ...product.orderItem,
                    quantity: product.orderItem.quantity - 1
                  }
                }
              }
              return product
            })
          ]
        }
      }

    case INCREMENT_QTY:
      return {
        ...state,
        userOrder: {
          ...state.userOrder,
          products: [
            ...state.userOrder.products.map(product => {
              if (product.id === action.product.id) {
                return {
                  ...product,
                  orderItem: {
                    ...product.orderItem,
                    quantity: product.orderItem.quantity + 1
                  }
                }
              }
              return product
            })
          ]
        }
      }
    default:
      return state
  }
}
