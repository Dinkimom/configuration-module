import { FormErrors } from '../../shared/types/FormErrors'
import { IApplicationDTO } from '../../shared/types/IApplicationDTO'

export const EDITOR_MODAL_OPEN_MODAL = 'EDITOR_MODAL_OPEN_MODAL'
export const EDITOR_MODAL_CLOSE_MODAL = 'EDITOR_MODAL_CLOSE_MODAL'

export const EDITOR_MODAL_CHANGE_NAME = 'EDITOR_MODAL_CHANGE_NAME'

export const EDITOR_MODAL_SET_PENDING = 'EDITOR_MODAL_SET_PENDING'

export const EDITOR_MODAL_ADD = 'EDITOR_MODAL_ADD'
export const EDITOR_MODAL_UPDATE = 'EDITOR_MODAL_UPDATE'

export const EDITOR_MODAL_SUCCESS = 'EDITOR_MODAL_SUCCESS'
export const EDITOR_MODAL_FAILURE = 'EDITOR_MODAL_FAILURE'

export const editorModalActions = {
  openModal: (payload?: string) => ({
    type: EDITOR_MODAL_OPEN_MODAL,
    payload,
  }),

  closeModal: () => ({
    type: EDITOR_MODAL_CLOSE_MODAL,
  }),

  changeName: (payload: { name: string }) => ({
    type: EDITOR_MODAL_CHANGE_NAME,
    payload,
  }),

  add: (payload: IApplicationDTO) => ({
    type: EDITOR_MODAL_ADD,
    payload,
  }),

  update: (payload: IApplicationDTO) => ({
    type: EDITOR_MODAL_UPDATE,
    payload,
  }),

  success: () => ({
    type: EDITOR_MODAL_SUCCESS,
  }),

  failure: (payload: { msg: string; errors: FormErrors }) => ({
    type: EDITOR_MODAL_FAILURE,
    payload,
  }),

  setPending: (payload: { flag: boolean }) => ({
    type: EDITOR_MODAL_SET_PENDING,
    payload,
  }),
}
