import { takeEvery, put } from 'redux-saga/effects'
import { safeSagaExecute } from '../../middleware/saga'
import { ApplicationsClient } from '../../services/ApplicationsClient'
import { IApplicationDTO } from '../../shared/types/IApplicationDTO'
import { IActionPayloaded } from '../../store/IAction'
import { EDITORS_DELETE, EDITORS_LOAD_DATA, editorsActions } from './actions'
import { paginationActions } from '../Pagination/actions'

const client = new ApplicationsClient()

export class EditorsApiSaga {
  public constructor() {
    this.load = this.load.bind(this)
    this.delete = this.delete.bind(this)
  }

  public static Initialize() {
    const saga = new EditorsApiSaga()
    return saga.watch()
  }

  public *watch() {
    yield takeEvery(EDITORS_LOAD_DATA, a => safeSagaExecute(a, this.load))
    yield takeEvery(EDITORS_DELETE, a => safeSagaExecute(a, this.delete))
  }

  private *load(action?: IActionPayloaded<{ currentPage: number }>) {
    yield put(editorsActions.setPending({ flag: true }))

    const response = yield client.getItems((action || {}).payload)

    if (response.status === 200) {
      yield put(editorsActions.dataLoaded({ list: response.data.items }))
      yield put(
        paginationActions.init({ totalPages: response.data.totalPages }),
      )
    } else {
      yield put(editorsActions.failure({ error: response.data.error }))
    }

    yield put(editorsActions.setPending({ flag: false }))
  }

  private *delete(action: IActionPayloaded<{ _id: string }>) {
    yield put(editorsActions.setPending({ flag: true }))

    const response = yield client.delete(action.payload._id)

    if (response.status === 200) {
      yield put(editorsActions.dataLoaded({ list: response.data.items }))
      yield put(
        paginationActions.init({
          totalPages: response.data.totalPages,
          currentPage: 1,
        }),
      )
    } else {
      yield put(editorsActions.failure({ error: response.data.error }))
    }

    yield put(editorsActions.setPending({ flag: false }))
  }
}
