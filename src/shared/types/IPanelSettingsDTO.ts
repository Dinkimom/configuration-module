import { ISettings } from './ISettings'

export interface IPanelSettingsDTO {
  _id?: string
  name: string
  settings: ISettings
  descriptionCode: string
}
