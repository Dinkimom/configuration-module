import { ConfigurationElement } from '../configurationElements/ConfigurationElement'
import { ISettings } from '../../shared/types/ISettings'

export interface IPanelState {
  online: boolean
  currentPage: null | string
  pages: ISettings
  focusedField?: string
}
