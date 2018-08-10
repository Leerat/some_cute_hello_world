import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from '../reducers'

const composeEnhancers = composeWithDevTools({
  name: 'Some cute hello world'
});

export default function configureStore(init = {}) {

  const store = createStore(reducer, init, composeEnhancers())

  if (module.hot) {
    module.hot.accept('../reducers/', () => {
      const nextReducer = require('../reducers/index').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

window.store = configureStore()
