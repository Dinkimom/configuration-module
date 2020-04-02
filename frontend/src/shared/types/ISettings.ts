import { IConfigurationElement } from '../types/IConfigurationElement'

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
        type: IConfigurationElement
        common?: boolean
      }
    }
  }
}
