import { ISettings } from './ISettings'

export interface IApplicationDTO {
  _id?: string
  name: string
  descriptionCode: string
  defaultSettings: ISettings
}
