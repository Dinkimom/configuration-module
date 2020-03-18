import axios, { AxiosResponse } from 'axios'
import { RequestsEnum } from '../shared/enums/RequestsEnum'
import { IApplicationDTO } from '../shared/types/IApplicationDTO'
import { AbstractClient } from './AbstractClient'

export class ApplicationsClient extends AbstractClient {
  constructor() {
    super('applications')
  }

  public add = async (body: IApplicationDTO): Promise<AxiosResponse> => {
    try {
      const response = await axios(this.helper(RequestsEnum.add, { body }))

      return response
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public update = async (data: IApplicationDTO) => {
    const { _id, ...body } = data

    try {
      const response = await this.axios(
        this.helper(RequestsEnum.update, { _id, body }),
      )

      return response
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public delete = async () => {}

  public getItem = async (_id: string): Promise<AxiosResponse> => {
    try {
      const response = await this.axios(
        this.helper(RequestsEnum.getItem, { _id }),
      )

      return response
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public getItems = async () => {}
}
