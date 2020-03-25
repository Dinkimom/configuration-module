import { ISettings } from '../../shared/types/ISettings'

export interface IPanelState {
  isInitialized: boolean
  name: string
  online: boolean
  currentPage: null | string
  pages: ISettings
  renderError: string
  focusedField?: string
  descriptionCode: string
}
