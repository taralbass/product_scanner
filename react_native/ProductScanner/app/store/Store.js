import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { upcsReducer } from '../reducers/upcsReducer'

const store = createStore(
  upcsReducer,
  applyMiddleware(thunk)
)

export default store

