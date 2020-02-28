export const MODAL_CREATE_OPEN_MODAL = 'MODAL_CREATE_OPEN_MODAL'
export const MODAL_CREATE_CLOSE_MODAL = 'MODAL_CREATE_CLOSE_MODAL'
export const MODAL_CREATE_ADD = 'MODAL_CREATE_ADD'

export const modalCreateActions = {
  openModal: () => ({
    type: MODAL_CREATE_OPEN_MODAL,
  }),

  closeModal: () => ({
    type: MODAL_CREATE_CLOSE_MODAL,
  }),
}
