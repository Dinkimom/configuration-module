import { put, takeEvery } from 'redux-saga/effects'
import { safeSagaExecute } from '../../middleware/saga'
import { ApplicationsClient } from '../../services/ApplicationsClient'
import { IApplicationDTO } from '../../shared/types/IApplicationDTO'
import { IActionPayloaded } from '../../store/IAction'
import { notificationSystem } from '../app'
import { codeEditorActions } from '../CodeEditor/actions'
import {
  editorModalActions,
  EDITOR_MODAL_ADD,
  EDITOR_MODAL_UPDATE,
} from './actions'

const client = new ApplicationsClient()

export class EditorModalApiSaga {
  public constructor() {
    this.add = this.add.bind(this)
    this.update = this.update.bind(this)
  }

  public static Initialize() {
    const saga = new EditorModalApiSaga()
    return saga.watch()
  }

  public *watch() {
    yield takeEvery(EDITOR_MODAL_ADD, (a) => safeSagaExecute(a, this.add))
    yield takeEvery(EDITOR_MODAL_UPDATE, (a) => safeSagaExecute(a, this.update))
  }

  private *add(action: IActionPayloaded<IApplicationDTO>) {
    yield put(editorModalActions.setPending({ flag: true }))

    const response = yield client.add(action.payload as IApplicationDTO)

    yield put(editorModalActions.setPending({ flag: false }))

    if ((response as any).status === 200) {
      yield put(editorModalActions.closeModal())
      window.location.href = `/editor/${response.data._id}`
    } else {
      yield put(editorModalActions.failure(response.data.error))
    }
  }

  private *update(action: IActionPayloaded<IApplicationDTO>) {
    yield put(editorModalActions.setPending({ flag: true }))

    const response = yield client.update(action.payload as IApplicationDTO)

    yield put(editorModalActions.setPending({ flag: false }))

    if ((response as any).status === 200) {
      yield put(
        codeEditorActions.dataLoaded({
          name: response.data.item.name,
          descriptionCode: response.data.item.descriptionCode,
        }),
      )
      yield put(editorModalActions.closeModal())

      notificationSystem.current.addNotification({
        message: 'Updated successfully!',
        level: 'success',
        position: 'tc',
      })
    } else {
      yield put(editorModalActions.failure(response.data.error))
    }
  }
}
