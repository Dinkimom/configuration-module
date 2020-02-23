import { all } from 'redux-saga/effects'

export const rootSaga = function* root() {
  yield all([])
}

export function* safeSagaExecute(action: any, func: (a: any) => any) {
  try {
    yield func(action)
  } catch (error) {
    console.error(error)
  }
}
