export const PANEL_INIT_COMPONENT = 'PANEL_INIT_COMPONENT'
export const PANEL_INIT_PAGE = 'PANEL_INIT_PAGE'
export const PANEL_CLEAR = 'PANEL_CLEAR'
export const PANEL_SET_CURRENT_PAGE = 'PANEL_SET_CURRENT_PAGE'
export const PANEL_SET_FIELD_VALUE = 'PANEL_SET_FIELD_VALUE'
export const PANEL_SET_FOCUSED_FIELD = 'PANEL_SET_FOCUSED_FIELD'

export const panelActions = {
  initComponent: (payload: { page: string; name: string; type: string }) => ({
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

  setFieldValue: (payload: { value: any; name: string; page: string }) => ({
    type: PANEL_SET_FIELD_VALUE,
    payload,
  }),

  setFocusedField: (payload: { name: string | undefined }) => ({
    type: PANEL_SET_FOCUSED_FIELD,
    payload,
  }),
}
