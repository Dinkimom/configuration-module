/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import objectAssignDeep from 'object-assign-deep'
import { delay, put, select, takeEvery } from 'redux-saga/effects'
import { safeSagaExecute } from '../../middleware/saga'
import { SettingsClient } from '../../services/SettingsClient'
import { ISettingDTO } from '../../shared/types/ISettingDTO'
import { IActionPayloaded } from '../../store/IAction'
import { IRootState } from '../../store/state'
import {
  panelActions,
  PANEL_INIT,
  PANEL_LOAD_DATA,
  PANEL_UPDATE_DATA,
} from './actions'
import { IPanelState } from './state'

const client = new SettingsClient()

export class PanelApiSaga {
  public constructor() {
    this.load = this.load.bind(this)
    this.update = this.update.bind(this)
    this.validate = this.validate.bind(this)
  }

  public static Initialize(): Generator {
    const saga = new PanelApiSaga()
    return saga.watch()
  }

  public *watch(): Generator {
    yield takeEvery(PANEL_LOAD_DATA, (a) => safeSagaExecute(a, this.load))
    yield takeEvery(PANEL_UPDATE_DATA, (a) => safeSagaExecute(a, this.update))
    yield takeEvery(PANEL_INIT, (a) => safeSagaExecute(a, this.validate))
  }

  private *load(
    action: IActionPayloaded<{ application_id: string; user_id: string }>,
  ): Generator {
    const settings: any = yield select((state: IRootState) => state.panel)

    yield put(panelActions.setPending({ flag: true }))

    const response: any = yield client.getItem(action.payload)

    if (response.status === 200) {
      if (response.data === null) {
        yield put(
          panelActions.failure({ error: "Requested panel doesn't exist" }),
        )
      } else {
        yield put(
          panelActions.init({
            online: true,
            descriptionCode: response.data.item.descriptionCode,
            _id: response.data.item._id,
            name: response.data.item.name,
            settings: objectAssignDeep(
              settings.settings,
              response.data.item.settings,
            ),
            currentPage: Object.keys(response.data.item.settings.pages)[0],
          } as Partial<IPanelState>),
        )
      }
    } else {
      yield put(panelActions.failure({ error: response.data.error }))
    }

    yield put(panelActions.setPending({ flag: false }))
  }

  private *update(action: IActionPayloaded<ISettingDTO>): Generator {
    yield client.update(action.payload)
  }

  private *validate(action: IActionPayloaded<Partial<IPanelState>>): Generator {
    const { descriptionCode } = action.payload

    if (!RegExp('<App>((.|\\s)*)</App>').test(String(descriptionCode))) {
      yield put(
        panelActions.setRenderError({
          error: 'Render error: There is no App component.',
        }),
      )
    } else if (
      !RegExp('<App>(\\s*)((<Page(.*)>(.|\\s)*</Page>)+)(\\s*)</App>').test(
        String(descriptionCode),
      )
    ) {
      yield put(
        panelActions.setRenderError({
          error: 'Render error: At least one page must be presented.',
        }),
      )
    } else {
      yield put(panelActions.validated(action.payload))

      yield put(panelActions.setPending({ flag: true }))

      yield delay(500)
      yield put(panelActions.setPending({ flag: false }))
    }
  }
}
