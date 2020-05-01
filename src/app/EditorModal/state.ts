import { FormErrors } from '../../shared/types/FormErrors'

export interface IEditorModalState {
  name: string
  isOpened: boolean
  error: {
    msg: string
    errors: FormErrors
  }
  isPending: boolean
}
