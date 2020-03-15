import { applyMiddleware, compose, createStore, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../middleware/saga'
import { rootReducer } from './reducer'
import { IRootState } from './state'

export function configureStore(initialState?: IRootState): Store {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [sagaMiddleware]
  const enhancer = compose(applyMiddleware(...middlewares))

  const store = createStore(rootReducer, initialState, enhancer)
  sagaMiddleware.run(rootSaga)

  return store
}
