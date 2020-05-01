import { ConfigurationElements } from '../enums/ConfigurationElements'
import { IOption } from './IOption'

export interface ISettings {
  common: {
    [key: string]: {
      params: {
        [key: string]: {
          value: any
        }
      }
    }
  }
  pages: {
    [key: string]: {
      [key: string]: {
        params: {
          [key: string]: {
            value?: any
            type: ConfigurationElements
            options?: IOption[]
          }
        }
      } & { common?: boolean }
    }
  }
}
