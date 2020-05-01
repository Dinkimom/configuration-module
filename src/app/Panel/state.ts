import { ISettings } from '../../shared/types/ISettings'

export interface IPanelState {
  _id?: string
  isInitialized: boolean
  name: string
  online: boolean
  currentPage: null | string
  settings: ISettings
  renderError: string
  focusedField?: string
  descriptionCode: string
  error: string
  isPending: boolean
}
