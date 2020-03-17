import { takeEvery, put, delay } from 'redux-saga/effects'
import { safeSagaExecute } from '../../middleware/saga'
import { IApplicationDTO } from '../../shared/types/IApplicationDTO'
import { IActionPayloaded } from '../../store/IAction'
import { ApplicationsClient } from '../../services/ApplicationsClient'
import {
  EDITOR_MODAL_ADD,
  EDITOR_MODAL_UPDATE,
  editorModalActions,
} from './actions'
import { AxiosResponse } from 'axios'

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

  private *update(action: IActionPayloaded<IApplicationDTO>) {}
}
