export const EDITOR_MODAL_OPEN_MODAL = 'EDITOR_MODAL_OPEN_MODAL'
export const EDITOR_MODAL_CLOSE_MODAL = 'EDITOR_MODAL_CLOSE_MODAL'
export const EDITOR_MODAL_ADD = 'EDITOR_MODAL_ADD'

export const editorModalActions = {
  openModal: () => ({
    type: EDITOR_MODAL_OPEN_MODAL,
  }),

  closeModal: () => ({
    type: EDITOR_MODAL_CLOSE_MODAL,
  }),
}
