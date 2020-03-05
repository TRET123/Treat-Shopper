import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import {user} from '../reducers/user'
import {products} from '../reducers/products'
import {cart} from '../reducers/cart'
import thunkMiddleware from 'redux-thunk'

const reducer = combineReducers({user, products, cart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
