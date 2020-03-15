export const CODE_EDITOR_CHANGE_CODE = 'CODE_EDITOR_CHANGE_CODE'
export const CODE_EDITOR_CHANGE_TO_RENDER = 'CODE_EDITOR_CHANGE_TO_RENDER'
export const CODE_EDITOR_CHANGE_HEIGHT = 'CODE_EDITOR_CHANGE_HEIGHT'
export const CODE_EDITOR_SET_ERROR = 'CODE_EDITOR_SET_ERROR'

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

  setError: (payload: { isError: boolean }) => ({
    type: CODE_EDITOR_SET_ERROR,
    payload,
  }),
}
