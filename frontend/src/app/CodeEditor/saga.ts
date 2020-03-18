import { put, takeEvery } from 'redux-saga/effects'
import { safeSagaExecute } from '../../middleware/saga'
import { ApplicationsClient } from '../../services/ApplicationsClient'
import { IApplicationDTO } from '../../shared/types/IApplicationDTO'
import { IActionPayloaded } from '../../store/IAction'
import { CODE_EDITOR_LOAD_DATA, codeEditorActions } from './actions'
import { editorModalActions } from '../EditorModal/actions'

const client = new ApplicationsClient()

export class CodeEditorApiSaga {
  public constructor() {
    this.load = this.load.bind(this)
  }

  public static Initialize() {
    const saga = new CodeEditorApiSaga()
    return saga.watch()
  }

  public *watch() {
    yield takeEvery(CODE_EDITOR_LOAD_DATA, a => safeSagaExecute(a, this.load))
  }

  private *load(action: IActionPayloaded<{ _id: string }>) {
    yield put(codeEditorActions.setPending({ flag: true }))

    const response = yield client.getItem(action.payload._id)

    if ((response as any).status === 200) {
      console.log(response)

      yield put(
        codeEditorActions.dataLoaded({
          descriptionCode: response.data.descriptionCode,
        }),
      )
      yield put(editorModalActions.changeName({ name: response.data.name }))
    }

    yield put(codeEditorActions.setPending({ flag: false }))
  }

  private *update(action: IActionPayloaded<IApplicationDTO>) {}
}
