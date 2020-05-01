import { ConfigurationElements } from '../enums/ConfigurationElements'
import { IOption } from './IOption'

export interface IParams {
  [key: string]: {
    type: ConfigurationElements
    options?: IOption[]
  }
}
