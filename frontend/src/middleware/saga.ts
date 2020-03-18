import { all } from 'redux-saga/effects'
import { EditorModalApiSaga } from '../app/EditorModal/saga'
import { CodeEditorApiSaga } from '../app/CodeEditor/saga'

export const rootSaga = function* root() {
  yield all([EditorModalApiSaga.Initialize(), CodeEditorApiSaga.Initialize()])
}

export function* safeSagaExecute(action: any, func: (a: any) => any) {
  try {
    yield func(action)
  } catch (error) {
    console.error(error)
  }
}
