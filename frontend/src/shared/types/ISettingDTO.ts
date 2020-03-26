import { ConfigurationElement } from '../../app/configurationElements/ConfigurationElement'

export interface ISettingDTO {
  application_id: string
  user_id: string
  page: string
  name: string
  value: any
  type: ConfigurationElement
}
