import { put, takeEvery, select, delay } from 'redux-saga/effects'
import { safeSagaExecute } from '../../middleware/saga'
import { IActionPayloaded } from '../../store/IAction'
import {
  panelActions,
  PANEL_LOAD_DATA,
  PANEL_SET_FIELD_VALUE,
  PANEL_UPDATE_DATA,
} from './actions'
import { SettingsClient } from '../../services/SettingsClient'
import { IRootState } from '../../store/state'
import { ISettingDTO } from '../../shared/types/ISettingDTO'
import { notificationSystem } from '../app'
import objectAssignDeep from 'object-assign-deep'
import { IPanelState } from './state'

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
    yield takeEvery(PANEL_UPDATE_DATA, a => safeSagaExecute(a, this.update))
  }

  private *load(
    action: IActionPayloaded<{ application_id: string; user_id: string }>,
  ) {
    const settings = yield select((state: IRootState) => state.panel.pages)

    yield put(panelActions.setPending({ flag: true }))

    const response = yield client.getItem(action.payload)

    if (response.status === 200) {
      yield put(
        panelActions.init({
          online: true,
          descriptionCode: response.data.descriptionCode,
          _id: response.data._id,
          name: response.data.name,
          pages: objectAssignDeep(settings, response.data.settings),
          currentPage: Object.keys(response.data.settings)[0],
        } as Partial<IPanelState>),
      )
    } else {
      yield put(panelActions.failure({ error: response.data.error }))
    }

    yield put(panelActions.setPending({ flag: false }))
  }

  private *update(action: IActionPayloaded<ISettingDTO>) {
    const response = yield client.update(action.payload)

    if ((response as any).status === 200) {
      notificationSystem.current.addNotification({
        message: 'All changes saved',
        level: 'info',
        position: 'bl',
      })
    }
  }
}
