import { put, takeEvery } from 'redux-saga/effects'
import { safeSagaExecute } from '../../middleware/saga'
import { IActionPayloaded } from '../../store/IAction'
import { panelActions, PANEL_LOAD_DATA } from './actions'
import { SettingsClient } from '../../services/SettingsClient'

const client = new SettingsClient()

export class PanelApiSaga {
  public constructor() {
    this.load = this.load.bind(this)
  }

  public static Initialize() {
    const saga = new PanelApiSaga()
    return saga.watch()
  }

  public *watch() {
    yield takeEvery(PANEL_LOAD_DATA, a => safeSagaExecute(a, this.load))
  }

  private *load(
    action: IActionPayloaded<{ application_id: string; user_id: string }>,
  ) {
    yield put(panelActions.setPending({ flag: true }))

    const response = yield client.getItem(action.payload)

    if (response.status === 200) {
      yield put(
        panelActions.init({
          descriptionCode: response.data.descriptionCode,
          _id: response.data._id,
          name: response.data.name,
        }),
      )
    } else {
      yield put(panelActions.failure({ error: response.data.error }))
    }

    yield put(panelActions.setPending({ flag: false }))
  }
}
