/* eslint-disable @typescript-eslint/unbound-method */
import objectAssignDeep from 'object-assign-deep'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { IOption } from '../../shared/types/IOption'
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import {
  PANEL_CLEAR,
  PANEL_FAILURE,
  PANEL_INIT,
  PANEL_INIT_COMPONENT,
  PANEL_INIT_PAGE,
  PANEL_SET_CURRENT_PAGE,
  PANEL_SET_FIELD_VALUE,
  PANEL_SET_FOCUSED_FIELD,
  PANEL_SET_MODE,
  PANEL_SET_PENDING,
  PANEL_SET_RENDER_ERROR,
} from './actions'
import { IPanelState } from './state'

const initialState: IPanelState = {
  isInitialized: false,
  name: '',
  online: false,
  currentPage: null,
  renderError: '',
  settings: {
    pages: {},
    common: {},
  },
  focusedField: undefined,
  descriptionCode: '',
  error: '',
  isPending: false,
}

const getDefaultSettings = (
  type: ConfigurationElements,
  options: IOption[],
) => {
  switch (type) {
    case ConfigurationElements.optional:
      return false
    case ConfigurationElements.select:
      return options[0].value
  }
}

export class PanelReducer implements IReducerPayloaded<IPanelState> {
  constructor() {
    this.reduce = this.reduce.bind(this)
  }

  public static Create(): any {
    const reducer = new PanelReducer()
    return reducer.reduce
  }

  public reduce(
    state: IPanelState = initialState,
    action: IActionPayloaded<any>,
  ): IPanelState {
    let newState = { ...state }

    switch (action.type) {
      case PANEL_INIT:
        newState = objectAssignDeep(initialState, action.payload)
        newState.isInitialized = true
        newState.settings.pages = {}
        if (action.payload.pages !== undefined) {
          newState.settings.pages = { ...action.payload.pages }
        }
        break

      case PANEL_INIT_PAGE:
        if (!newState.settings.pages[action.payload.name]) {
          newState.settings.pages[action.payload.name] = {}
          newState.currentPage = Object.keys(newState.settings.pages)[0]
        }
        break

      case PANEL_INIT_COMPONENT:
        if (!action.payload.common) {
          if (
            !newState.settings.pages[action.payload.page][action.payload.name]
          ) {
            newState.settings.pages[action.payload.page][
              action.payload.name
            ] = {
              value: getDefaultSettings(
                action.payload.type,
                action.payload.options,
              ),
              type: action.payload.type,
              options: action.payload.options,
            }
          }
        } else {
          if (!newState.settings.common[action.payload.name]) {
            newState.settings.common[action.payload.name] = {
              value: getDefaultSettings(
                action.payload.type,
                action.payload.options,
              ),
            }
          }

          if (
            !newState.settings.pages[action.payload.page][action.payload.name]
          ) {
            newState.settings.pages[action.payload.page][
              action.payload.name
            ] = {
              type: action.payload.type,
              options: action.payload.options,
              common: true,
            }
          }
        }
        break

      case PANEL_SET_CURRENT_PAGE:
        newState.currentPage = action.payload.name
        break

      case PANEL_CLEAR:
        newState = { ...initialState }
        newState.settings.pages = {}
        newState.settings.common = {}
        break

      case PANEL_SET_FIELD_VALUE:
        if (action.payload.common) {
          newState.settings.common[action.payload.name].value =
            action.payload.value
        } else {
          newState.settings.pages[action.payload.page][
            action.payload.name
          ].value = action.payload.value
        }
        break

      case PANEL_SET_FOCUSED_FIELD:
        newState.focusedField = action.payload.name
        break

      case PANEL_SET_MODE:
        newState.online = action.payload.online
        break

      case PANEL_SET_RENDER_ERROR:
        newState.renderError = action.payload.error
        break
      case PANEL_SET_PENDING:
        newState.isPending = action.payload.flag
        break
      case PANEL_FAILURE:
        newState.error = action.payload.error
        break
    }

    return newState
  }
}
