export const CODE_EDITOR_CHANGE_CODE = 'CODE_EDITOR_CHANGE_CODE'
export const CODE_EDITOR_CHANGE_TO_RENDER = 'CODE_EDITOR_CHANGE_TO_RENDER'
export const CODE_EDITOR_CHANGE_HEIGHT = 'CODE_EDITOR_CHANGE_HEIGHT'

export const CODE_EDITOR_LOAD_DATA = 'CODE_EDITOR_LOAD_DATA'
export const CODE_EDITOR_DATA_LOADED = 'CODE_EDITOR_DATA_LOADED'
export const CODE_EDITOR_SET_FAILURE = 'CODE_EDITOR_SET_FAILURE'

export const CODE_EDITOR_SET_PENDING = 'CODE_EDITOR_SET_PENDING'

export const CODE_EDITOR_CLEAR = 'CODE_EDITOR_CLEAR'

export const codeEditorActions = {
  changeCode: (payload: { code: string }) => ({
    type: CODE_EDITOR_CHANGE_CODE,
    payload,
  }),

  changeToRender: (payload: { toRender: string }) => ({
    type: CODE_EDITOR_CHANGE_TO_RENDER,
    payload,
  }),

  changeHeight: (payload: { height: string | number }) => ({
    type: CODE_EDITOR_CHANGE_HEIGHT,
    payload,
  }),

  loadData: (payload: { _id: string }) => ({
    type: CODE_EDITOR_LOAD_DATA,
    payload,
  }),

  dataLoaded: (payload: { descriptionCode: string; name: string }) => ({
    type: CODE_EDITOR_DATA_LOADED,
    payload,
  }),

  setPending: (payload: { flag: boolean }) => ({
    type: CODE_EDITOR_SET_PENDING,
    payload,
  }),

  setFailure: (payload: { msg: string; actionButton?: boolean }) => ({
    type: CODE_EDITOR_SET_FAILURE,
    payload,
  }),

  clear: () => ({
    type: CODE_EDITOR_CLEAR,
  }),
}
