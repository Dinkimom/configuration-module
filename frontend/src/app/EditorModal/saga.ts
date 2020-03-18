import { put, takeEvery } from 'redux-saga/effects'
import { safeSagaExecute } from '../../middleware/saga'
import { ApplicationsClient } from '../../services/ApplicationsClient'
import { IApplicationDTO } from '../../shared/types/IApplicationDTO'
import { IActionPayloaded } from '../../store/IAction'
import {
  editorModalActions,
  EDITOR_MODAL_ADD,
  EDITOR_MODAL_UPDATE,
} from './actions'
import { codeEditorActions } from '../CodeEditor/actions'

const client = new ApplicationsClient()

export class EditorModalApiSaga {
  public constructor() {
    this.add = this.add.bind(this)
  }

  public static Initialize() {
    const saga = new EditorModalApiSaga()
    return saga.watch()
  }

  public *watch() {
    yield takeEvery(EDITOR_MODAL_ADD, a => safeSagaExecute(a, this.add))
    yield takeEvery(EDITOR_MODAL_UPDATE, a => safeSagaExecute(a, this.update))
  }

  private *add(action: IActionPayloaded<IApplicationDTO>) {
    yield put(editorModalActions.setPending({ flag: true }))

    const response = yield client.add(action.payload as IApplicationDTO)

    if ((response as any).status === 200) {
      alert('Added successfully!')
    }

    yield put(editorModalActions.setPending({ flag: false }))
  }

  private *update(action: IActionPayloaded<IApplicationDTO>) {
    yield put(editorModalActions.setPending({ flag: true }))

    const response = yield client.update(action.payload as IApplicationDTO)

    if ((response as any).status === 200) {
      yield put(
        codeEditorActions.dataLoaded({
          name: response.data.name,
          descriptionCode: response.data.descriptionCode,
        }),
      )
      yield put(editorModalActions.closeModal())

      alert('Added successfully!')
    }

    yield put(editorModalActions.setPending({ flag: false }))
  }
}
