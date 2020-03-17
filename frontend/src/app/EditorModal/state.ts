import { FormErrors } from '../../shared/types/FormErrors'

export interface IEditorModalState {
  isOpened: boolean
  error: {
    msg: string
    errors: FormErrors
  }
  isPending: boolean
}
