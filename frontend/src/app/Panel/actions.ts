import { ISettingDTO } from '../../shared/types/ISettingDTO'
import { IPanelState } from './state'

export const PANEL_INIT = 'PANEL_INIT'

export const PANEL_INIT_COMPONENT = 'PANEL_INIT_COMPONENT'
export const PANEL_INIT_PAGE = 'PANEL_INIT_PAGE'
export const PANEL_CLEAR = 'PANEL_CLEAR'
export const PANEL_SET_RENDER_ERROR = 'PANEL_SET_RENDER_ERROR'
export const PANEL_SET_CURRENT_PAGE = 'PANEL_SET_CURRENT_PAGE'
export const PANEL_SET_FIELD_VALUE = 'PANEL_SET_FIELD_VALUE'
export const PANEL_SET_FOCUSED_FIELD = 'PANEL_SET_FOCUSED_FIELD'
export const PANEL_SET_MODE = 'PANEL_SET_MODE'
export const PANEL_SET_PENDING = 'PANEL_SET_PENDING'
// only online mode
export const PANEL_LOAD_DATA = 'PANEL_LOAD_DATA'
export const PANEL_FAILURE = 'PANEL_FAILURE'
export const PANEL_UPDATE_DATA = 'PANEL_UPDATE_DATA'

export const panelActions = {
  init: (payload?: Partial<IPanelState>) => ({
    type: PANEL_INIT,
    payload,
  }),

  initComponent: (payload: {
    page: string
    name: string
    type: string
    common?: boolean
  }) => ({
    type: PANEL_INIT_COMPONENT,
    payload,
  }),

  initPage: (payload: { name: string }) => ({
    type: PANEL_INIT_PAGE,
    payload,
  }),

  clear: () => ({
    type: PANEL_CLEAR,
  }),

  setCurrentPage: (payload: { name: string }) => ({
    type: PANEL_SET_CURRENT_PAGE,
    payload,
  }),

  setFieldValue: (payload: {
    value: any
    name: string
    page: string
    common?: boolean
  }) => ({
    type: PANEL_SET_FIELD_VALUE,
    payload,
  }),

  setFocusedField: (payload: { name: string | undefined }) => ({
    type: PANEL_SET_FOCUSED_FIELD,
    payload,
  }),

  setMode: (payload: { online: boolean }) => ({
    type: PANEL_SET_MODE,
    payload,
  }),

  setRenderError: (payload: { error: string }) => ({
    type: PANEL_SET_RENDER_ERROR,
    payload,
  }),

  loadData: (payload: { application_id: string; user_id: string }) => ({
    type: PANEL_LOAD_DATA,
    payload,
  }),

  updateData: (payload: ISettingDTO) => ({
    type: PANEL_UPDATE_DATA,
    payload,
  }),

  setPending: (payload: { flag: boolean }) => ({
    type: PANEL_SET_PENDING,
    payload,
  }),

  failure: (payload: { error: string }) => ({
    type: PANEL_FAILURE,
    payload,
  }),
}
