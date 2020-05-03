import { AxiosError, AxiosResponse } from 'axios'
import { IPanelSettingsDTO } from '../shared/types/IPanelSettingsDTO'
import { ISettingDTO } from '../shared/types/ISettingDTO'
import { AbstractClient } from './AbstractClient'

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
      return await this.axios.get(
        `${this.URL}/item/${application_id}/${user_id}`,
      )
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public getItems = async () => {}

  public add = async () => {}

  public update = async (data: ISettingDTO) => {
    try {
      return await this.axios.put(
        `${this.URL}/item/${data.application_id}/${data.user_id}`,
        {
          settings: data.common
            ? {
                common: {
                  [data.name]: {
                    params: {
                      [data.param]: {
                        value: data.value,
                      },
                    },
                  },
                },
              }
            : {
                pages: {
                  [data.page]: {
                    [data.name]: {
                      params: {
                        [data.param]: {
                          value: data.value,
                        },
                      },
                    },
                  },
                },
              },
        },
      )
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public delete = async () => {}
}
