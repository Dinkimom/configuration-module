import { ConfigurationElement } from '../../app/configurationElements/ConfigurationElement'

export interface ISettings {
  common: {
    [key: string]: {
      value: any
    }
  }
  pages: {
    [key: string]: {
      [key: string]: {
        value?: any
        type: ConfigurationElement
        common?: boolean
      }
    }
  }
}
