import { ConfigurationElement } from '../configurationElements/ConfigurationElement'

export interface IPanelState {
  online: boolean
  currentPage: null | string
  pages: {
    [key: string]: {
      [key: string]: {
        value: any
        type: ConfigurationElement
      }
    }
  }
  focusedField?: string
}
