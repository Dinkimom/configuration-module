import axios, { AxiosResponse, AxiosError } from 'axios'
import { RequestsEnum } from '../shared/enums/RequestsEnum'
import { IApplicationDTO } from '../shared/types/IApplicationDTO'
import { AbstractClient } from './AbstractClient'

export class ApplicationsClient extends AbstractClient {
  constructor() {
    super('applications')
  }

  public add = async (
    body: IApplicationDTO,
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const response = await axios(this.helper(RequestsEnum.add, { body }))

      return response
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public update = async (
    data: IApplicationDTO,
  ): Promise<AxiosResponse | AxiosError> => {
    const { _id, ...body } = data

    try {
      const response = await this.axios(
        this.helper(RequestsEnum.update, { _id, body }),
      )

      return response
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public delete = async (_id: string) => {
    try {
      const response = await this.axios(
        this.helper(RequestsEnum.delete, { _id }),
      )

      return response
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public getItem = async (_id: string): Promise<AxiosResponse | AxiosError> => {
    try {
      const response: any = await this.axios(
        this.helper(RequestsEnum.getItem, { _id }),
      )

      return response
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public getItems = async (params?: { currentPage: number }) => {
    try {
      const response = await this.axios(
        this.helper(RequestsEnum.getItems, {}, params),
      )

      return response
    } catch (error) {
      return this.errorHandler(error)
    }
  }
}
