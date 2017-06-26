import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import { productsReducer } from 'reducers/productsReducer'

const logger = createLogger({
  collapsed: (getState, action) => true
})

const store = createStore(
  productsReducer,
  applyMiddleware(thunk, logger)
)

export default store

