import { AbstractClient } from './AbstractClient'
import { IPanelSettingsDTO } from '../shared/types/IPanelSettingsDTO'
import { AxiosResponse, AxiosError } from 'axios'

export class SettingsClient extends AbstractClient {
  constructor() {
    super('settings')
  }

  public getItem = async ({
    application_id,
    user_id,
  }: {
    application_id: string
    user_id: string
  }): Promise<AxiosResponse<IPanelSettingsDTO> | AxiosError> => {
    try {
      const response = await this.axios(
        `${this.URL}/item/${application_id}/${user_id}`,
      )

      return response
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public getItems = async () => {}

  public add = async () => {}

  public update = async () => {}

  public delete = async () => {}
}
