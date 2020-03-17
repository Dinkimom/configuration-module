import { ConfigurationElement } from '../../app/configurationElements/ConfigurationElement'

export interface ISettings {
  [key: string]: {
    [key: string]: {
      value: any
      type: ConfigurationElement
    }
  }
}
